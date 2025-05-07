import { ArrowLeft } from 'lucide-react';
import { TravelRequestTableRow } from '../../../utils/travelRequestData';

interface EmpDetailHeaderProps {
  name: string;
  travelType: TravelRequestTableRow['travelType'];
  onBackClick: () => void;
}

const EmpDetailHeader = ({ name, travelType, onBackClick }: EmpDetailHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            travelType === 'International'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {travelType}
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
  );
};

export default EmpDetailHeader;
