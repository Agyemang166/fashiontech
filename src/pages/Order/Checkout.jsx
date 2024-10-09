import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../../contexts/userContext'; // Importing the user context
import { useCartProducts } from '../../contexts/CartContext'; // Import cart context to get total price
import { PaystackButton } from 'react-paystack';
import { db } from '../../services/firebaseConfig'; // Firestore configuration
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import Confetti from 'react-confetti'; // Import confetti for success effect

const Checkout = () => {
  const { currentUser } = useCurrentUser(); // Access the current user's details from the context
  const { cartProducts, clearCart } = useCartProducts(); // Get cart products and clearCart function
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Email field added
  const [address, setAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // To store total cart amount
  const [isSuccess, setIsSuccess] = useState(false); // State to track payment success
  const navigate = useNavigate(); // Hook for redirection

  // Pre-fill the user's name and email when the component mounts
  useEffect(() => {
    if (currentUser) {
      console.log('Pre-filling user details:', currentUser);
      setName(currentUser.name || ''); // Assuming the user object has a `name` property
      setEmail(currentUser.email || ''); // Assuming the user object has an `email` property
    } else {
      console.warn('No current user found!');
    }
  }, [currentUser]);

  // Calculate the total amount of the cart
  useEffect(() => {
    const calculateTotal = () => {
      const total = cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      console.log('Total cart amount calculated:', total);
      return total;
    };
    setTotalAmount(calculateTotal());
  }, [cartProducts]);

  // Paystack configuration
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = totalAmount * 100; // Multiply total by 100 as Paystack uses the smallest currency unit (i.e. GHS * 100)

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
      alert("Payment Successful");

      // Create the order and send email
      const orderId = await handleOrderCreation();
      clearCart();
      setIsSuccess(true);
      navigate('/');
      // Prepare email data
      const emailData = {
        name,
        email,
        cartItems: cartProducts,
        totalAmount,
      };

      // Send email notification
      try {
        console.log('Sending email data:', emailData); // Debugging line
        const res = await fetch('https://mallzonix-backend1.onrender.com/api/sendOrderNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        // Log the response to check for errors
        if (!res.ok) {
          throw new Error('Failed to send email');
        }

        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }

    },
    onClose: () => {
      console.warn("Transaction was not completed.");
      alert("Transaction was not completed");
    },
  };

  // Function to handle order creation and storing in both collections
  const handleOrderCreation = async () => {
    try {
      // Create an order in the main orders collection
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
      const orderDocRef = await addDoc(ordersRef, orderData); // Save order to main collection

      // Create a subcollection for the user
      const userOrdersRef = collection(db, 'users', currentUser.id, 'orders');
      await addDoc(userOrdersRef, { ...orderData, orderId: orderDocRef.id }); // Save order to user-specific subcollection

      return orderDocRef.id; // Return the order ID if needed
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !email || !address || !deliveryLocation || !phone) {
      alert("Please fill in all required fields.");
      console.warn('Form validation failed. Missing required fields.');
      return;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden mt-5">
      {isSuccess && <Confetti />} {/* Show confetti if payment is successful */}
      <div className="px-4 py-2">
        <h2 className="text-1xl font-bold tracking-tight text-gray-900">Checkout</h2>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
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
          <label htmlFor="delivery-location" className="block text-sm font-medium text-gray-700">
            Delivery Location
          </label>
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
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
          <label htmlFor="delivery-instructions" className="block text-sm font-medium text-gray-700">
            Delivery Instructions
          </label>
          <textarea
            id="delivery-instructions"
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Any special instructions for delivery"
          />
          <p className='text-red-500 font-bold'>Please, note deliveries are only made in Kumasi for now</p>
          </div>

        <div className="mt-6">
          <PaystackButton
            className={`bg-indigo-600 text-white px-6 py-3 rounded-md ${!name || !email || !address || !deliveryLocation || !phone ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...componentProps}
            disabled={!name || !email || !address || !deliveryLocation || !phone} // Disable button if fields are empty
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
