import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
          {/* <h1 className="ml-4 md:ml-0 text-xl font-semibold text-gray-800">Dashboard</h1> */}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;