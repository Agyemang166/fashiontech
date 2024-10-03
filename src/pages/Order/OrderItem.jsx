import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext'; // Adjust the import path as necessary

export default function OrderItem() {
  const navigate = useNavigate();
  const { productList } = useProducts(); // Access productList from ProductContext

  // Calculate total price of items in the order
  const calculateTotal = () => {
    return productList.reduce((total, item) => {
      return total + item.price * item.quantity; // Assuming item.price is a number
    }, 0).toFixed(2);
  };

  // Handle delete functionality (this needs to be defined based on your context logic)
  const handleDelete = (id) => {
    // Implement your delete logic here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden mt-4">
      <div className="px-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">My Order Summary</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Close
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {productList.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.images[0]} // Adjust based on how you store images in product
                    alt={item.name} // Use item.name for better accessibility
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="/detailspage">{item.name}</a>
                      </h3>
                      <div className="flex flex-col items-end">
                        <p className="ml-4">${item.price.toFixed(2)}</p> {/* Price on top */}
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
                        onClick={() => {/* Decrease quantity logic */}}
                      >
                        -
                      </button>
                      <span className="border-t border-b border-gray-300 px-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-black text-white rounded-r-md px-2 flex items-center justify-center"
                        onClick={() => {/* Increase quantity logic */}}
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
          <p>${calculateTotal()}</p>
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
