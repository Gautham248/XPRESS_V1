import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
        <p className="text-gray-600">
          This is the dashboard page of your application.
        </p>
      </div>
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Users', 'Revenue', 'Traffic', 'Conversion'].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-500">{item}</p>
            <p className="text-2xl font-semibold mt-2">
              {index === 0 ? '1,234' : 
               index === 1 ? '$12,345' : 
               index === 2 ? '56.7K' : 
               '12.3%'}
            </p>
            <div className="flex items-center mt-2">
              <span className={`text-xs ${index % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                {index % 2 === 0 ? '+12.3%' : '-5.2%'}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <p className="font-medium">Activity {item}</p>
                  <span className="text-sm text-gray-500">2h ago</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Brief description of activity {item} details.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3">
                  <p className="font-medium">Task {item}</p>
                  <p className="text-sm text-gray-500">Due in {item} day{item !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;