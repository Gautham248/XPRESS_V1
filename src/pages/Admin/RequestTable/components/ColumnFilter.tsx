import React from 'react';
import { X } from 'lucide-react';

interface Column {
  id: string;
  label: string;
  checked: boolean;
}

interface ColumnFilterProps {
  columns: Column[];
  onColumnToggle: (columnId: string) => void;
  onClose: () => void;
  filterMenuRef: React.RefObject<HTMLDivElement>;
  position: { top: number; left: number };
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({
  columns,
  onColumnToggle,
  onClose,
  filterMenuRef,
  position
}) => {
  return (
    <div 
      ref={filterMenuRef}
      className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Show/Hide Columns</h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {columns.map((column) => (
          <div key={column.id} className="py-2 flex items-center gap-2">
            <input
              type="checkbox"
              id={column.id}
              checked={column.checked}
              onChange={() => onColumnToggle(column.id)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor={column.id} className="text-sm text-gray-700">
              {column.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnFilter;