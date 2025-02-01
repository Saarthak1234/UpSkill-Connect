import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { UserCircle, Menu as MenuIcon } from 'lucide-react';
const Navbar = () => {
  return (
    <nav className="bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-customPurple to-blue-500 bg-clip-text text-transparent">
  UpSkill Connect
</h1>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/" className="text-zinc-50 hover:text-white">Home</Link>
            <Link to="/Connect" className="text-zinc-50 hover:text-white">Find Mentor</Link>
            <Link to="/counselling" className="text-zinc-50 hover:text-white">AI Chat</Link>
            <Link to="/Doubts" className="text-zinc-50 hover:text-white">Doubt Solver</Link>
            
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Login
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <MenuIcon className="h-6 w-6" />
              </Menu.Button>
              {/* Mobile menu items can be added here */}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
