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
 

interface DetailsProps {
  employee: Employee;
}
 
const Details: React.FC<DetailsProps> = ({ employee }) => {
  return (
    <div className="space-y-3">
      <p><span className="font-medium">Project Code:</span> {employee.projectCode}</p>
      <p><span className="font-medium">Reporting Manager:</span> {employee.reportingManager}</p>
      <p><span className="font-medium">Delivery Unit:</span> {employee.deliveryUnit}</p>
      <p><span className="font-medium">Source:</span> {employee.source}</p>
      <p><span className="font-medium">Destination:</span> {employee.destination}</p>
      
      <p><span className="font-medium">Travel Category:</span> {employee.travelCategory}</p>
    </div>
  );
};
 
export default Details;