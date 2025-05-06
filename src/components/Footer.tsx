import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} AppName. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;