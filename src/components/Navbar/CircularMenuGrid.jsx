import React from 'react';
import { Link } from 'react-router-dom';
import menuItems from './MenuItems';

const CircularMenuGrid = () => {


  return (
    <div className="container mx-auto pb-5">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-6">
        {menuItems.map((item, index) => (
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
    </div>
  );
};

export default CircularMenuGrid;
