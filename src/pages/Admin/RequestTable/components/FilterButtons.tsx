import React from 'react';
import { ChevronDown, Calendar, Filter } from 'lucide-react';

interface FilterButtonsProps {
  onToggleColumnFilter: () => void;
  showColumnFilter: boolean;
  filterButtonRef: React.RefObject<HTMLButtonElement>;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  onToggleColumnFilter,
  showColumnFilter,
  filterButtonRef
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        Type <ChevronDown className="w-4 h-4" />
      </button>
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        Select Date <Calendar className="w-4 h-4" />
      </button>
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        Status <ChevronDown className="w-4 h-4" />
      </button>
      <button 
        ref={filterButtonRef}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${showColumnFilter ? 'text-white bg-purple-600' : 'text-gray-700 bg-white'} border border-gray-300 rounded-lg hover:${showColumnFilter ? 'bg-purple-700' : 'bg-gray-50'}`}
        onClick={onToggleColumnFilter}
      >
        <Filter className="w-4 h-4" />
        <span>Columns</span>
      </button>
    </div>
  );
};

export default FilterButtons;