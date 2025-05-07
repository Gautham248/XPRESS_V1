import { useState, useEffect } from 'react';
import { dummyTravelRequests } from '../../../../utils/travelRequestData';
import Details from './Details';
import Button from './Button';

// Interface aligned with expected fields, including those not in TravelRequestTableRow
interface Employee {
  id: string;
  name: string;
  travelType: string;
  projectCode: string;
  reportingManager: string;
  deliveryUnit: number;
  source: string;
  destination: string;
  travelMode: string; // Keep this as Details component requires it
  travelCategory: string;
}

// Map TravelRequestTableRow to Employee interface
const mapToEmployee = (travelRequest: typeof dummyTravelRequests[0]): Employee => ({
  id: travelRequest.requestId, // Map requestId to id
  name: travelRequest.name,
  travelType: travelRequest.travelType,
  projectCode: travelRequest.projectCode,
  reportingManager: travelRequest.reportingManager,
  deliveryUnit: parseInt(travelRequest.department?.replace('DU', '') || '0', 10), // Derive from department, e.g., "DU3" -> 3
  source: travelRequest.source,
  destination: travelRequest.destination,
  travelMode: '', // Empty string instead of 'Unknown'
  travelCategory: travelRequest.travelType === 'International' ? 'Overseas' : 'Local', // Example derivation
});

interface CalendarModalProps {
  employeeId: string;
  onClose: () => void; // Add onClose prop to handle closing from parent
}

const CalendarModal = ({ employeeId, onClose }: CalendarModalProps) => {
  // Map dummyTravelRequests to Employee and find by id
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  useEffect(() => {
    // Find the employee whenever employeeId changes
    const employee = dummyTravelRequests
      .map(mapToEmployee)
      .find((employee: Employee) => employee.id === employeeId) || null;
    
    setSelectedEmployee(employee);
  }, [employeeId]);

  const handleClose = () => {
    onClose(); // Call the parent's onClose function
  };

  // If no employee found, don't render the modal
  if (!selectedEmployee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-sm text-gray-500 font-medium">{selectedEmployee.travelType}</h2>
        <h3 className="text-2xl font-bold mb-4">{selectedEmployee.name}</h3>

        <Details employee={selectedEmployee} />

        <div className="mt-6 flex justify-end">
          <Button onClick={handleClose} text="Close" />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;