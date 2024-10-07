import React from 'react';
import { useOrders } from '../../contexts/OrderContext'; // Import the orders context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import emptyOrdersGif from '../../Assets/Empty.gif'; // Adjust the path to your empty GIF

const OrdersPage = () => {
  const { orders, loading, fetchMoreOrders } = useOrders(); // Get orders and loading state
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle order click
  const handleOrderClick = (orderId) => {
    navigate(`/orders-details/${orderId}`); // Navigate to order details page
  };

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4 ml-3">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={emptyOrdersGif} alt="No Mallzonix Orders Available" className="w-1/2 mb-4" />
          <p className="text-gray-700">No orders available.</p>
          <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-4 py-2 mt-4 rounded-md"
        >
          Shop Now
        </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-3">
          {orders.map(order => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order.id)} // Click to navigate
              className="bg-white border border-gray-300 rounded-lg shadow-md p-2 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <p className="">Total Amount: GHS {order.totalAmount}</p>
              <p className="text-sm text-gray-600">
                Status: {order.status || 'Received by MALLZONIX'}
              </p>
            </div>
          ))}
          {orders.length > 5 && ( // Only show button if more than 5 orders
            <button 
              onClick={fetchMoreOrders} 
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Load More Orders
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
