import EmpDetailHeader from './EmpDetailHeader';
import EmpDetailBasicInfo from './EmpDetailBasicInfo';
import EmpDetailTravelInfo from './EmpDetailTravelInfo';
import { TravelRequestTableRow as TravelRequest } from '../../../utils/travelRequestData';

interface EmployeeDetailsBoxProps {
  request: TravelRequest;
  onBackClick: () => void;
  formatDate: (dateString: string) => string;
}

const EmpDetailComponent = ({ request, onBackClick, formatDate }: EmployeeDetailsBoxProps) => {
  const { departureDate, returnDate } = request.travelDates;
  const formattedDepartureDate = formatDate(departureDate);
  const formattedReturnDate = formatDate(returnDate);

  return (
    <div className="w-full lg:h-3/5 bg-white rounded-lg shadow">
      <EmpDetailHeader name={request.name} travelType={request.travelType} onBackClick={onBackClick} />
      <div className="p-6">
        <EmpDetailBasicInfo department={request.department} projectCode={request.projectCode} />
        <EmpDetailTravelInfo
          source={request.source}
          destination={request.destination}
          formattedDepartureDate={formattedDepartureDate}
          formattedReturnDate={formattedReturnDate}
        />
      </div>
    </div>
  );
};

export default EmpDetailComponent;
