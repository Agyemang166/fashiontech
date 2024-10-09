import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartProducts } from '../../contexts/CartContext'; // Import the Cart context
import { removeFromCart, updateCartItemQuantity } from '../../components/Card/ProductCardFunctions'; // Import the required functions
import { db } from '../../services/firebaseConfig'; // Adjust the import path for your firebase config
import { useCurrentUser } from '../../contexts/userContext'; // Assuming you have an AuthContext for current user
import Empty from '../../Assets/Empty.gif';
import { FaTimes } from "react-icons/fa";

export default function OrderItem() {
  const navigate = useNavigate();
  const { cartProducts, loading } = useCartProducts(); // Access cartProducts from CartProductsContext
  const { currentUser } = useCurrentUser(); // Use current user from AuthContext
  const userId = currentUser ? currentUser.id : null; // Get the userId

  // Calculate total price of items in the order
  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + item.price * item.quantity; // Assuming item.price is a number
    }, 0).toFixed(2);
  };

  // Handle delete functionality (using removeFromCart from ProductCardFunctions)
  const handleDelete = async (productId) => {
    try {
      const productToDelete = cartProducts.find(item => item.id === productId);
      if (productToDelete && userId) { // Ensure userId is defined
        // Call the removeFromCart function
        await removeFromCart(db, userId, productToDelete, navigate, () => {});
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Update quantity of the cart item
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (userId) { // Ensure userId is defined
      // Prevent quantity from going below 1
      if (newQuantity < 1) {
        console.error('Quantity cannot be less than 1'); // You can also show an alert or notification
        return;
      }
      // Update the cart item's quantity in Firebase
      await updateCartItemQuantity(db, userId, productId, newQuantity);
    } else {
      console.error('User ID is not defined');
    }
  };

  if (loading) {
    return <div>Loading your cart items...</div>;
  }

  // If cart is empty, show empty state
  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-42">
        <img 
          src={Empty}
          alt="Empty Cart" 
          className="mb-4" 
        />
        <p className="text-lg text-gray-700 mb-4">Your Mallzonix cart is empty.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden mt-4">
      <div className="px-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">My Order Summary</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
        <FaTimes size={30} color='black'/>
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartProducts.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image} // Adjust based on how you store images in cart
                    alt={item.name} // Use item.name for better accessibility
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={`/products/${item.id}`}>{item.productName }</a>
                      </h3>
                      <div className="flex flex-col items-end">
                      <p className="ml-4">
                      {new Intl.NumberFormat('en-GH', {
                        style: 'currency',
                        currency: 'GHC',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(item.price)}
                    </p> 
                                            <button
                          onClick={() => handleDelete(item.id)} // Handle delete item
                          className="mt-1 text-red-600 hover:text-red-500 font-medium"
                        >
                          Remove
                        </button> {/* Delete button below price */}
                      </div>
                    </div>
                    <p className="mt-[-10px] text-sm text-gray-500">Qty: {item.quantity}</p>

                    {/* Quantity Control */}
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-black text-white rounded-l-md px-2 flex items-center justify-center"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1} // Disable the button if quantity is 1
                      >
                        -
                      </button>
                      <span className="border-t border-b border-gray-300 px-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-black text-white rounded-r-md px-2 flex items-center justify-center"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>
  {new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHC',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(calculateTotal())}
</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <div
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Payment
          </div>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
