import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter, Calendar, ChevronDown, MoreVertical } from 'lucide-react';
import { dummyTravelRequests, getStatusColor } from '../../../utils/travelRequestData';

// Main table component
export default function TravelRequestsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredRequests = dummyTravelRequests.filter(request => 
    request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredRequests.length / 10);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * 10, currentPage * 10);

  const handleRowClick = (requestId: string) => {
    navigate(`/travel-request-details/${requestId}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Search and filters */}
      <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Type <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Select Date <Calendar className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Status <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Request ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Project Code</th>
              <th scope="col" className="px-6 py-3">Travel Type</th>
              <th scope="col" className="px-6 py-3">Source</th>
              <th scope="col" className="px-6 py-3">Destination</th>
              <th scope="col" className="px-6 py-3">Travel & Return Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((request, index) => (
              <tr 
                key={index} 
                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(request.requestId)}
              >
                <td className="px-6 py-4 font-medium text-gray-900">{request.requestId}</td>
                <td className="px-6 py-4">{request.name}</td>
                <td className="px-6 py-4">{request.projectCode}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.travelType === 'International' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {request.travelType}
                  </span>
                </td>
                <td className="px-6 py-4">{request.source}</td>
                <td className="px-6 py-4">{request.destination}</td>
                <td className="px-6 py-4">
                  {request.travelDates.departureDate}
                  <span className="mx-2 text-gray-400">to</span>
                  {request.travelDates.returnDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    className="p-2 rounded-full hover:bg-gray-200" 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Open actions menu for ${request.requestId}`);
                    }}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            {currentPage}/{totalPages}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            Export Excel
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}