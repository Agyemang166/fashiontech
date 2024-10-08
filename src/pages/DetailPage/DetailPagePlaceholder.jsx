import React from 'react';
import { FaHeart, FaRegStar } from 'react-icons/fa';



export default function DetailPagePlaceholder() {
  return (
    <div className="bg-white max-w-2xl mx-auto p-4">

      {/* Placeholder Product Name */}
      <h2 className="text-2xl font-bold tracking-tight text-gray-400 animate-pulse bg-gray-300 h-8 w-3/4 mb-2">Product Name</h2>

      {/* Placeholder Price */}
      <div className="flex justify-between items-center my-2">
        <div className="animate-pulse bg-gray-300 h-6 w-1/2"></div>
      </div>

      {/* Placeholder Quantity Selector */}
      <div className="flex items-center my-4">
        <button className="bg-gray-300 rounded-l-md px-3 py-1 animate-pulse"></button>
        <input
          type="text"
          readOnly
          className="border border-gray-300 text-center p-1 w-12 bg-gray-300 animate-pulse"
        />
        <button className="bg-gray-300 rounded-r-md px-3 py-1 animate-pulse"></button>
      </div>

      {/* Placeholder Favorite and Cart Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center border-t border-black">
        <button className="animate-pulse">
          <FaHeart className="text-gray-300 mr-5" size={30} />
        </button>

        <button className="w-full py-2 bg-gray-300 text-white rounded animate-pulse"></button>
      </div>

      {/* Placeholder Product Description */}
      <p className="text-1xl font-bold tracking-tight text-gray-900 mt-5 bg-gray-300 h-6 w-1/3 animate-pulse"></p>
      <p className="tracking-tight text-gray-900 bg-gray-300 h-4 w-full animate-pulse"></p>

      {/* Placeholder Review Section */}
      <div className="my-6 mb-[60px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold mb-4 text-gray-400 bg-gray-300 h-6 w-1/4 animate-pulse">review</h3>
        </div>

        <div className="mb-4">
          <p className="bg-gray-300 h-4 w-1/3 animate-pulse"></p>
        </div>

        <p className="bg-gray-300 h-4 w-full animate-pulse"></p>

        {/* Placeholder for reviews */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, starIndex) => (
                  <FaRegStar key={starIndex} className="text-gray-300" size={20} />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500 bg-gray-300 h-4 w-1/4 animate-pulse"></p>
            </div>
            <p className="bg-gray-300 h-4 w-full animate-pulse"></p>
          </div>
        ))}
      </div>
    </div>
  );
}
