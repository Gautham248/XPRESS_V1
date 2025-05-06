import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Settings, X, BarChart2, Users, FileText } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  closeSidebar: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, closeSidebar }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
          isActive 
            ? 'bg-indigo-700 text-white' 
            : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
        }`
      }
      onClick={() => closeSidebar()}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:flex-shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700">
            <div className="flex items-center">
              <BarChart2 className="h-6 w-6 text-indigo-300" />
              <span className="ml-2 text-lg font-semibold">AppName</span>
            </div>
            <button 
              className="text-indigo-300 hover:text-white md:hidden"
              onClick={closeSidebar}
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavItem to="/" icon={<Home size={20} />} label="Home" closeSidebar={closeSidebar} />
            <NavItem to="/dashboard" icon={<BarChart2 size={20} />} label="Dashboard" closeSidebar={closeSidebar} />
            <NavItem to="/users" icon={<Users size={20} />} label="Users" closeSidebar={closeSidebar} />
            <NavItem to="/reports" icon={<FileText size={20} />} label="Reports" closeSidebar={closeSidebar} />
            <NavItem to="/about" icon={<Info size={20} />} label="About" closeSidebar={closeSidebar} />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" closeSidebar={closeSidebar} />
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-indigo-700">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-indigo-300">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;