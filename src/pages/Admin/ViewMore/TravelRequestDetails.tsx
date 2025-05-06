import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { dummyTravelRequests} from '../../../utils/travelRequestData';
import { StepperComponent } from './Stepper/StepperComponent';
import EmpDetailComponent from './EmpDetailComponent';

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
  { id: 1, status: 'Pending', description: '', date: '', active: false, completed: false },
  { id: 2, status: 'Manager Approved', description: '', date: '', active: false, completed: false },
  { id: 3, status: 'Tickets Selected', description: '', date: '', active: false, completed: false },
  { id: 4, status: 'DU Head Approved', description: '', date: '', active: false, completed: false },
  { id: 5, status: 'Tickets Dispatched', description: '', date: '', active: false, completed: false },
  { id: 6, status: 'In-transit', description: '', date: '', active: false, completed: false },
  { id: 7, status: 'Returned', description: '', date: '', active: false, completed: false },
  { id: 8, status: 'Closed', description: '', date: '', active: false, completed: false },
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

// Dynamic descriptions for active state
const getActiveDescription = (statusId: number): string => {
  switch (statusId) {
    case 1:
      return 'Awaiting manager approval';
    case 2:
      return 'Awaiting ticket selection';
    case 3:
      return 'Awaiting DU Head approval';
    case 4:
      return 'Awaiting ticket dispatch';
    case 5:
      return 'Preparing for departure';
    case 6:
      return 'Employee currently traveling';
    case 7:
      return 'Awaiting expense reports';
    case 8:
      return 'Processing final documents';
    default:
      return 'In progress';
  }
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

  // Format date for timeline
  const formatTimelineDate = (offset: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Update timeline steps based on request status
  const currentStepIndex = statusToStep[request.status];
  const isRejected = request.status === 'Rejected';
  
  const updatedTimelineSteps = timelineSteps.map((step) => {
    if (isRejected) {
      return {
        ...step,
        active: step.id === 0,
        completed: step.id === -1,
        description: '',
        date: step.id === 0 ? formatTimelineDate() : ''
      };
    } else {
      const daysOffset = currentStepIndex - step.id > 0 ? currentStepIndex - step.id : 0;
      
      return {
        ...step,
        active: step.id === currentStepIndex,
        completed: step.id < currentStepIndex,
        description: step.id === currentStepIndex ? getActiveDescription(step.id) : '',
        date: step.id < currentStepIndex ? formatTimelineDate(daysOffset) : '',
      };
    }
  });
  
  // Format dates for display in details section
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };  
  
  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Request Timeline */}
        <StepperComponent steps={updatedTimelineSteps} isRejected={isRejected}/>
        
        {/* Request Details */}
        <EmpDetailComponent request={request} onBackClick={() => navigate('/requestTable') } formatDate={formatDate}/>
      </div>
    </div>
  );
}