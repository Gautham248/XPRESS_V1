import { ArrowLeft } from 'lucide-react';
import { TravelRequestTableRow as TravelRequest } from '../../../utils/travelRequestData';

interface EmployeeDetailsBoxProps {
    request: TravelRequest;
    onBackClick: () => void;
    formatDate: (dateString: string) => string;
  }

  const EmpDetailComponent = ({ request, onBackClick,formatDate}: EmployeeDetailsBoxProps) => {
    const { departureDate, returnDate } = request.travelDates;
    const formattedDepartureDate = formatDate(departureDate);
    const formattedReturnDate = formatDate(returnDate);
    return (
        <div className="w-full lg:h-3/5 bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{request.name}</h1>
                    <div className="mt-2">
                   
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.travelType === 'International' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {request.travelType}
                    </span>
                    </div>
                </div>

                <button
                    onClick={onBackClick}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-y-6 mb-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Department</h3>
                        <p className="text-gray-900">{request.department || 'Not specified'}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Project Code</h3>
                        <p className="text-gray-900">{request.projectCode}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Mode of Travel</h3>
                                <p className="text-gray-900">Flight</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Source</h3>
                                <p className="text-gray-900">{request.source}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Destination</h3>
                                <p className="text-gray-900">{request.destination}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Date of Travel</h3>
                                <p className="text-gray-900">
                                    {formattedDepartureDate} <span className="text-gray-500">to</span> {formattedReturnDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                
                {/* <div className="flex flex-col sm:flex-row gap-3 mt-6">
                </div> */}
            </div>
        </div>
    )
}

export default EmpDetailComponent
