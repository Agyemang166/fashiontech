import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '../../contexts/OrderContext'; // Context to fetch orders
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const { orders } = useOrders(); // Get the orders from context
  const [order, setOrder] = useState(null);

  // Find the order based on the orderId
  useEffect(() => {
    const foundOrder = orders.find(order => order.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId, orders]);

  // If order is not found yet
  if (!order) {
    return <div>Loading order details...</div>;
  }

  const { cartItems, deliveryLocation, email, name, phone, status, totalAmount, createdAt } = order;

  // Determine the status color
  const statusClass = () => {
    if (status === 'Received') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'On-Route') {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white min-h-screen ">
      <div className="max-w-4xl mx-auto bg-white rounded-xl  p-6">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
          {/* Status with conditional color */}
          <span className={`px-4 py-2 rounded-lg text-sm ${statusClass()} font-semibold`}>
            Status: {status || 'Received by MALLZONIX'}
          </span>
        </div>

        {/* Order ID and Date */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Order ID: {order.id}</h3>
          <p className="text-sm text-gray-500">
            Date: {new Date(createdAt.seconds * 1000).toLocaleString()}
          </p>
        </div>

        {/* Delivery Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Delivery Information</h3>
          <p className="text-sm text-gray-600">Name: {name}</p>
          <p className="text-sm text-gray-600">Email: {email}</p>
          <p className="text-sm text-gray-600">Phone: {phone}</p>
          <p className="text-sm text-gray-600">Address: {deliveryLocation}</p>
        </div>

        {/* Items Ordered */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Items Ordered</h3>
          <div className="border border-gray-200 rounded-lg">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                <Link to={`/products/${item.id}`} className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{item.productName}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </Link>
                <p className="text-sm font-semibold text-gray-900">GHS {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
          <p className="text-2xl font-bold text-gray-900">GHS {totalAmount.toFixed(2)}</p>
        </div>

        {/* Optional Notes Section */}
        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
          <p className="text-sm text-gray-600">Special instructions can be added here.</p>
        </div> */}
      </div>
    </div>
  );
};

export default OrderDetails;
