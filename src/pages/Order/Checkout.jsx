import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../contexts/userContext';
import { useCartProducts } from '../../contexts/CartContext';
import { PaystackButton } from 'react-paystack';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import ReactLoading from 'react-loading';

const Checkout = () => {
  const { currentUser } = useCurrentUser();
  const { cartProducts, clearCart } = useCartProducts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    } else {
      console.warn('No current user found!');
    }
  }, [currentUser]);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      return total;
    };
    setTotalAmount(calculateTotal());
  }, [cartProducts]);

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = totalAmount * 100;

  const componentProps = {
    email,
    amount,
    currency: 'GHS',
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: async (response) => {
      console.log('Payment successful! Paystack response:', response);
      alert("We have successfully received your order. Thank you for shopping with MallZonix");

      const orderId = await handleOrderCreation();
      clearCart();
      setIsSuccess(true);

      const emailData = {
        name,
        email,
        cartItems: cartProducts,
        totalAmount,
      };

      setLoadingEmail(true);
      setEmailSuccess(false);
      setEmailError(false);

      const maxRetries = 10;
      const retryDelay = 8000;

      const sendEmailWithRetry = async (retryCount = 0) => {
        try {
          console.log(`Attempt ${retryCount + 1}: Sending email data...`);
          const res = await fetch('https://mallzonix-backend1.onrender.com/api/sendOrderNotification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          });

          if (!res.ok) {
            throw new Error('Failed to send email');
          }

          console.log('Email sent successfully');
          setEmailSuccess(true);
          clearCart();
          alert("Order receipt generated and sent to your email.");
          navigate('/');
        } catch (error) {
          console.error('Error sending email:', error);
          if (retryCount < maxRetries) {
            setTimeout(() => sendEmailWithRetry(retryCount + 1), retryDelay);
          } else {
            console.error('Max retries reached. Email could not be sent.');
            setEmailError(true);
            alert("There was an issue sending your order receipt. Please Check Your Orders for receipt");
            navigate('/');
          }
        } finally {
          setLoadingEmail(false);
        }
      };

      sendEmailWithRetry();
    },
    onClose: () => {
      console.warn("Transaction was not completed.");
      alert("Transaction was not completed. Please try again.");
    },
  };

  const handleOrderCreation = async () => {
    try {
      const ordersRef = collection(db, 'orders');
      const orderData = {
        userId: currentUser.id,
        name,
        email,
        address,
        deliveryLocation,
        phone,
        deliveryInstructions,
        totalAmount,
        cartItems: cartProducts,
        createdAt: new Date(),
      };
      const orderDocRef = await addDoc(ordersRef, orderData);
      return orderDocRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address || !deliveryLocation || !phone) {
      alert("Please fill in all required fields.");
      console.warn('Form validation failed. Missing required fields.');
      return;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden mt-5">
      {isSuccess && <Confetti />}
      <div className="px-4 py-2">
        <h2 className="text-1xl font-bold tracking-tight text-gray-900">Checkout</h2>
      </div>

      {/* Conditionally render the form or the messages based on isSuccess */}
      {isSuccess ? (
        <div className="mb-4">
          {loadingEmail ? (
            <div className="flex items-center justify-center">
              <ReactLoading type="spin" color="#000" height={30} width={30} />
              <span className="ml-2">Wait for order receipt to be generated. Please wait till you see an alert and click okay.</span>
              <span className="ml-2 text-center">Generating...</span>
            </div>
          ) : emailSuccess ? (
            <div className="text-green-600">Order receipt generated and sent to your email.</div>
          ) : emailError ? (
            <div className="text-red-600">There was an issue sending your order receipt. Please contact support.</div>
          ) : null}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-4 py-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="delivery-location" className="block text-sm font-medium text-gray-700">Delivery Location</label>
            <input
              type="text"
              id="delivery-location"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Please Enter Valid Delivery Location"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="delivery-instructions" className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
            <textarea
              id="delivery-instructions"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter any delivery instructions"
            />
          </div>

          <div className="mb-4">
            <span className="text-lg font-bold">Total Amount: GHS {totalAmount}</span>
          </div>
          <PaystackButton
          className={`bg-indigo-600 text-white px-6 py-3 rounded-md ${!name || !email || !address || !deliveryLocation || !phone ? 'opacity-50 cursor-not-allowed' : ''}`}
          {...componentProps}
          disabled={!name || !email || !address || !deliveryLocation || !phone} // Disable button if fields are empty
        />
        </form>
      )}
    </div>
  );
};

export default Checkout;
