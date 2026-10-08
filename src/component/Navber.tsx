import React from 'react';
import Navlink from './Navlink';

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        




      <div className="flex items-center gap-4 mr-4">
          <span className="text-2xl ">🛒</span>
          <div >
            <h1 className="text-xl font-bold text-gray-800">বাজার দর </h1>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬ </p>

          </div>

        </div>




        <div className="flex items-center gap-4 mr-4">
          <button className="text-sm font-medium text-gray-700 hover:text-green-600">
            সাইন ইন
          </button>
          <button className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            সাইন আপ
          </button>
        </div>
      </div>
      <Navlink />
    </header>
  );
};

export default Navbar;