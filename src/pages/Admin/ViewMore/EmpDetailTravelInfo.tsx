interface EmpDetailTravelInfoProps {
    source: string;
    destination: string;
    formattedDepartureDate: string;
    formattedReturnDate: string;
  }
  
  const EmpDetailTravelInfo = ({
    source,
    destination,
    formattedDepartureDate,
    formattedReturnDate,
  }: EmpDetailTravelInfoProps) => (
    <div className="grid grid-cols-1 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Mode of Travel</h3>
            <p className="text-gray-900">Flight</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Source</h3>
            <p className="text-gray-900">{source}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Destination</h3>
            <p className="text-gray-900">{destination}</p>
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
  );
  
  export default EmpDetailTravelInfo;
  