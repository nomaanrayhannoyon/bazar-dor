import React from 'react';
import Navlink from './Navlink';

import Userinfo from './Userinfo';

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




      <Userinfo />
      </div>
      <Navlink /> 
    </header>
  );
};

export default Navbar;