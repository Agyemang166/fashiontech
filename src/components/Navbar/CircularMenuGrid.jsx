import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuItems from './MenuItems';

const CircularMenuGrid = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation(); // Get the current route

  // Function to toggle the visibility of the remaining items
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // Find the excluded item based on the current route
  const excludedItem = menuItems.find(item => item.route === location.pathname);

  // Filter menuItems to exclude the item matching the current route
  const filteredMenuItems = menuItems.filter(item => item.route !== location.pathname);

  // Determine how many items to show based on 'showMore' state
  const displayedItems = showMore ? filteredMenuItems : filteredMenuItems.slice(0, 10);

  return (
    <div className="container mx-auto pb-5">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-6">
        {displayedItems.map((item, index) => (
          <Link key={index} to={item.route} className="text-center">
            <div className="flex flex-col items-center space-y-2">
              {/* Circular Image */}
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden bg-gray-200">
                <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
              </div>
              {/* Menu Item Text */}
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Excluded Item Name and Show More/Show Less Link */}
      {filteredMenuItems.length > 10 && (
        <div className="flex justify-between mx-[20px] mt-5">
          {excludedItem && (
            <span className="text-gray-900 text-lg font-bold">
            {excludedItem.name}
          </span>
          )}
          <span
            onClick={handleShowMore}
            className="text-blue-500 cursor-pointer underline text-sm font-semibold"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularMenuGrid;
