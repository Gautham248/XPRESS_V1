import React from 'react';
import { getStatusColor } from '../../../../utils/travelRequestData';

interface Column {
  id: string;
  label: string;
  checked: boolean;
}

interface TravelDates {
  departureDate: string;
  returnDate: string;
}

interface TravelRequest {
  requestId: string;
  name: string;
  projectCode: string;
  travelType: string;
  source: string;
  destination: string;
  travelDates: TravelDates;
  status: string;
}

interface DataTableProps {
  visibleColumns: Column[];
  requests: TravelRequest[];
  onRowClick: (requestId: string) => void;
  formatDate: (date: string) => string;
}

const DataTable: React.FC<DataTableProps> = ({
  visibleColumns,
  requests,
  onRowClick,
  formatDate
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-x-auto border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.filter(col => col.checked).map((column) => (
                  <th key={column.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick(request.requestId)}
                >
                  {visibleColumns.find(col => col.id === 'requestId')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requestId}</td>
                  )}
                  {visibleColumns.find(col => col.id === 'name')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.name}</td>
                  )}
                  {visibleColumns.find(col => col.id === 'projectCode')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.projectCode}</td>
                  )}
                  {visibleColumns.find(col => col.id === 'travelType')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.travelType === 'International' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {request.travelType}
                      </span>
                    </td>
                  )}
                  {visibleColumns.find(col => col.id === 'source')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.source}</td>
                  )}
                  {visibleColumns.find(col => col.id === 'destination')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.destination}</td>
                  )}
                  {visibleColumns.find(col => col.id === 'travelDates')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.travelDates.departureDate)}
                      <span className="mx-2 text-gray-400">to</span>
                      {formatDate(request.travelDates.returnDate)}
                    </td>
                  )}
                  {visibleColumns.find(col => col.id === 'status')?.checked && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;