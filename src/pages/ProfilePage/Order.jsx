import React, { useState } from 'react';
import { useOrders } from '../../contexts/OrderContext'; // Import the orders context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import emptyOrdersGif from '../../Assets/Empty.gif'; // Adjust the path to your empty GIF

const OrdersPage = () => {
  const { orders, loading, loadMoreOrders, hasMore } = useOrders(); // Get orders, loading state, loadMoreOrders function, and hasMore
  const navigate = useNavigate(); // Initialize navigate function
  const [activeTab, setActiveTab] = useState('all'); // State for active tab ('all', 'On-Route', 'Delivered')

  // Function to handle order click
  const handleOrderClick = (orderId) => {
    navigate(`/orders-details/${orderId}`); // Navigate to order details page
  };

  // Function to filter orders based on active tab
  const filteredOrders = () => {
    switch (activeTab) {
      case 'On-Route':
        return orders.filter(order => order.status === 'On-Route');
      case 'Delivered':
        return orders.filter(order => order.status === 'Received' || order.status === 'Delivered');
      default:
        return orders; // 'all' tab shows all orders
    }
  };

  // Helper function to format timestamps
  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp.seconds * 1000));
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto pb-7 bg-[#f7f7f7]">
      <h2 className="text-2xl font-bold mb-4 ml-3">Your Orders</h2>

      {/* Tabs for filtering orders */}
      <div className="flex justify-center mb-5 space-x-3">
        <span
          className={`cursor-pointer text-lg px-2 py-0 rounded-[5px] ${
            activeTab === 'all'
              ? 'bg-black text-white' // Active tab styling
              : 'bg-gray-300 text-black' // Inactive tab styling
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </span>
        <span
          className={`cursor-pointer text-lg px-2 py-0 rounded-[5px] ${
            activeTab === 'On-Route'
              ? 'bg-black text-white' // Active tab styling
              : 'bg-gray-300 text-black' // Inactive tab styling
          }`}
          onClick={() => setActiveTab('On-Route')}
        >
          On-Route
        </span>
        <span
          className={`cursor-pointer text-lg px-2 py-0 rounded-[5px] ${
            activeTab === 'Delivered'
              ? 'bg-black text-white' // Active tab styling
              : 'bg-gray-300 text-black' // Inactive tab styling
          }`}
          onClick={() => setActiveTab('Delivered')}
        >
          Received/Delivered
        </span>
      </div>

      {/* Display orders based on selected tab */}
      {filteredOrders().length === 0 ? (
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
          {filteredOrders().map(order => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order.id)} // Click to navigate
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out"
            >
              <div className="items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-500">                    
                  {formatTimestamp(order.createdAt)}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-2">
                <p className="text-lg text-gray-900 font-medium mb-1">Total: GHS {order.totalAmount}</p>
                {/* Conditional status color */}
                <p className="text-sm text-gray-600">
                  Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'On-Route' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {order.status || 'Received by MALLZONIX'}
                  </span>
                </p>
                {/* Display the appropriate timestamp based on the status */}
                {order.status === 'On-Route' && order.onRouteTimestamp && (
                  <p className="text-sm text-gray-500">
                    On-Route: {formatTimestamp(order.onRouteTimestamp)}
                  </p>
                )}
                {order.status === 'Delivered' && order.deliveredTimestamp && (
                  <p className="text-sm text-gray-500">
                    Delivered: {formatTimestamp(order.deliveredTimestamp)}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Delivery Location: {order.deliveryLocation || 'N/A'}</p>
                <button className="text-sm text-blue-600 font-semibold hover:underline">View Details</button>
              </div>
            </div>
          ))}
          {hasMore && ( // Only show button if there are more orders to load
            <button 
              onClick={loadMoreOrders} 
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
