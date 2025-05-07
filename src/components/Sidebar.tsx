import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, X, BarChart2, Users, FileText, Calendar } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
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
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:h-screen md:flex-shrink-0`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700">
          <div className="flex items-center">
            <span className="text-lg font-semibold">XPress</span>
          </div>
          <button 
            className="text-indigo-300 hover:text-white md:hidden"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/requestTable" icon={<FileText size={20} />} label="Requests" />
          <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
          {/* <NavItem to="/dashboard" icon={<BarChart2 size={20} />} label="Dashboard" /> */}
          {/* <NavItem to="/users" icon={<Users size={20} />} label="Users" /> */}
          {/* <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" /> */}
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
  );
};

export default Sidebar;