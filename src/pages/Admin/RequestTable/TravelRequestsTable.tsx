import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyTravelRequests } from '../../../utils/travelRequestData';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import ColumnFilter from './components/ColumnFilter';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';

// Date formatting function
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
};

// Main table component
export default function TravelRequestsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [filterMenuPosition, setFilterMenuPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // All available columns
  const allColumns = [
    { id: 'requestId', label: 'Request ID', checked: true },
    { id: 'name', label: 'Name', checked: true },
    { id: 'projectCode', label: 'Project Code', checked: true },
    { id: 'travelType', label: 'Travel Type', checked: true },
    { id: 'source', label: 'Source', checked: true },
    { id: 'destination', label: 'Destination', checked: true },
    { id: 'travelDates', label: 'Travel Dates', checked: true },
    { id: 'status', label: 'Status', checked: true },
  ];
  
  // State for visible columns with localStorage persistence
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedColumns = localStorage.getItem('tableVisibleColumns');
    return savedColumns ? JSON.parse(savedColumns) : allColumns;
  });
  
  const filteredRequests = dummyTravelRequests.filter(request => 
    request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredRequests.length / 10);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * 10, currentPage * 10);

  const handleRowClick = (requestId: string) => {
    navigate(`/travel-request-details/${requestId}`);
  };

  const toggleColumnFilter = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setFilterMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShowColumnFilter(!showColumnFilter);
  };

  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns((prev: { filter: (arg0: (col: any) => any) => { (): any; new(): any; length: any; }; find: (arg0: (col: any) => boolean) => { (): any; new(): any; checked: any; }; map: (arg0: (col: any) => any) => any; }) => {
      // Make sure at least one column is always visible
      const currentlyChecked = prev.filter(col => col.checked).length;
      if (currentlyChecked === 1 && prev.find(col => col.id === columnId)?.checked) {
        return prev;
      }
      
      const newColumns = prev.map(col => 
        col.id === columnId ? { ...col, checked: !col.checked } : col
      );
      
      // Save to localStorage
      localStorage.setItem('tableVisibleColumns', JSON.stringify(newColumns));
      return newColumns;
    });
  };

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current && 
        !filterMenuRef.current.contains(event.target as Node) &&
        filterButtonRef.current && 
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowColumnFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
        <SearchBar onSearch={(value) => {
          setSearchTerm(value);
          setCurrentPage(1); // Reset to first page on search
        }} />
        <FilterButtons
          onToggleColumnFilter={toggleColumnFilter}
          showColumnFilter={showColumnFilter}
          filterButtonRef={filterButtonRef}
        />
      </div>

      {showColumnFilter && (
        <ColumnFilter
          columns={visibleColumns}
          onColumnToggle={handleColumnToggle}
          onClose={() => setShowColumnFilter(false)}
          filterMenuRef={filterMenuRef}
          position={filterMenuPosition}
        />
      )}

      <DataTable
        visibleColumns={visibleColumns}
        requests={paginatedRequests}
        onRowClick={handleRowClick}
        formatDate={formatDate}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}