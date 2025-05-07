import { useState, useEffect } from 'react';
import { dummyTravelRequests } from '../../../../utils/travelRequestData';
import Details from './Details';
import Button from './Button';


interface Employee {
  id: string;
  name: string;
  travelType: string;
  projectCode: string;
  reportingManager: string;
  deliveryUnit: number;
  source: string;
  destination: string;
  travelCategory: string;
}


const mapToEmployee = (travelRequest: typeof dummyTravelRequests[0]): Employee => ({
  id: travelRequest.requestId, 
  name: travelRequest.name,
  travelType: travelRequest.travelType,
  projectCode: travelRequest.projectCode,
  reportingManager: travelRequest.reportingManager,
  deliveryUnit: parseInt(travelRequest.department?.replace('DU', '') || '0', 10), 
  source: travelRequest.source,
  destination: travelRequest.destination,
  travelCategory: travelRequest.travelType === 'International' ? 'International' : 'Domestic', 
});

interface CalendarModalProps {
  employeeId: string;
  onClose: () => void; 
}

const CalendarModal = ({ employeeId, onClose }: CalendarModalProps) => {
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  useEffect(() => {
    
    const employee = dummyTravelRequests
      .map(mapToEmployee)
      .find((employee: Employee) => employee.id === employeeId) || null;
    
    setSelectedEmployee(employee);
  }, [employeeId]);

  const handleClose = () => {
    onClose(); 
  };

 
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