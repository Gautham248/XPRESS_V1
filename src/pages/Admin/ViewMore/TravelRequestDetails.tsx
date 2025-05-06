import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { dummyTravelRequests, getStatusColor } from '../../../utils/travelRequestData';
import { StepperComponent } from './Stepper/StepperComponent';

// Define timeline step type
export interface TimelineStep {
  id: number;
  status: string;
  description?: string;
  date?: string;
  active: boolean;
  completed: boolean;
}

// Timeline steps in order of progression
const timelineSteps: TimelineStep[] = [
  { id: 1, status: 'Pending', description: '', active: false, completed: false },
  { id: 2, status: 'Manager Approved', description: 'Waiting...', active: false, completed: false },
  { id: 3, status: 'Tickets Selected', description: '', active: false, completed: false },
  { id: 4, status: 'DU Head Approved', description: '', active: false, completed: false },
  { id: 5, status: 'Tickets Dispatched', description: '', active: false, completed: false },
  { id: 6, status: 'In-transit', description: '', active: false, completed: false },
  { id: 7, status: 'Returned', description: '', active: false, completed: false },
  { id: 8, status: 'Closed', description: '', active: false, completed: false },
];

// Map status to timeline step index
const statusToStep: Record<string, number> = {
  'Pending': 1,
  'Manager Approved': 2,
  'Tickets Selected': 3,
  'DU Head Approved': 4,
  'Tickets Dispatched': 5,
  'In-transit': 6,
  'Returned': 7,
  'Closed': 8,
  'Rejected': -1, // Special case
};

export default function TravelRequestDetails() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  
  // Find the request with the matching ID
  const request = dummyTravelRequests.find(req => req.requestId === requestId);
  
  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Request Not Found</h1>
          <p className="mb-6">The travel request you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/requestTable')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Requests
          </button>
        </div>
      </div>
    );
  }

  // Update timeline steps based on request status
  const currentStepIndex = statusToStep[request.status];
  const isRejected = request.status === 'Rejected';
  
  const updatedTimelineSteps = timelineSteps.map((step) => {
    if (isRejected) {
      // If rejected, only mark the first step as completed
      return {
        ...step,
        active: step.id === 1,
        completed: step.id === 1,
        description: step.id === 1 ? 'Mon, 14 March 2025, 04:00 PM' : step.description
      };
    } else {
      // Normal flow
      return {
        ...step,
        active: step.id === currentStepIndex,
        completed: step.id < currentStepIndex,
        description: step.id === 1 ? 'Mon, 14 March 2025, 04:00 PM' : step.description
      };
    }
  });
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Convert departure/return dates to display format
  const departureDate = formatDate(request.travelDates.departureDate);
  const returnDate = formatDate(request.travelDates.returnDate);

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Request Timeline */}
        <StepperComponent steps={updatedTimelineSteps} isRejected={isRejected}/>

        
        {/* Request Details */}
        <div className="w-full lg:w-3/5 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{request.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <button 
              onClick={() => navigate('/requestTable')}
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
                      {departureDate} <span className="text-gray-500">to</span> {returnDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.travelType === 'International' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                {request.travelType}
              </span>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex-1 text-center">
                Download Itinerary
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex-1 text-center">
                Print Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}