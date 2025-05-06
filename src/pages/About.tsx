import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
      <p className="text-gray-600 mb-4">
        This is the about page of your application. Here you can provide information about your
        company, application, or any other relevant details.
      </p>
      <p className="text-gray-600 mb-4">
        The layout structure includes a responsive sidebar, header, and footer that are shared
        across all pages, including this about page.
      </p>
      <p className="text-gray-600">
        This template is designed to be minimal and responsive, making it suitable for various
        types of applications. The sidebar collapses on mobile devices and can be toggled using
        the menu button in the header.
      </p>
    </div>
  );
};

export default About;