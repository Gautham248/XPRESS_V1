import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Filter } from 'lucide-react';
import { CalendarView } from './types';

interface CalendarHeaderProps {
  calendarView: CalendarView;
  selectedDate: Date;
  weekStartDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setWeekStartDate: Dispatch<SetStateAction<Date>>;
  setCalendarView: Dispatch<SetStateAction<CalendarView>>; // Add this prop
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  formatDateRange: (startDate: Date) => string;
  formatSingleDate: (date: Date) => string;
}

const CalendarHeader = ({
  calendarView,
  selectedDate,
  weekStartDate,
  setSelectedDate,
  setWeekStartDate,
  setCalendarView, // Use this prop
  handlePrevWeek,
  handleNextWeek,
  handlePrevDay,
  handleNextDay,
  formatDateRange,
  formatSingleDate,
}: CalendarHeaderProps) => {
  const [showViewSelector, setShowViewSelector] = useState<boolean>(false);

  const toggleViewSelector = () => {
    setShowViewSelector(!showViewSelector);
  };

  const selectView = (view: CalendarView) => {
    setCalendarView(view); // Set the calendar view
    setShowViewSelector(false);
  };

  useEffect(() => {
    if (showViewSelector) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.view-selector-container')) {
          setShowViewSelector(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showViewSelector]);

  const getWeekStartDate = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  return (
    <div className="flex justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <button
          className="bg-gray-100 border border-gray-200 text-gray-800 py-2 px-3 rounded mr-2 flex items-center cursor-pointer hover:bg-gray-200"
          onClick={() => {
            const today = new Date();
            setSelectedDate(today);
            setWeekStartDate(getWeekStartDate(today));
          }}
        >
          <span className="mr-1">📅</span>
          <span>Today</span>
        </button>

        <button
          className="bg-transparent border-none text-gray-800 cursor-pointer p-2 mx-0.5 rounded hover:bg-gray-100"
          onClick={calendarView === 'week' ? handlePrevWeek : handlePrevDay}
        >
          ❮
        </button>
        <button
          className="bg-transparent border-none text-gray-800 cursor-pointer p-2 mx-0.5 rounded hover:bg-gray-100"
          onClick={calendarView === 'week' ? handleNextWeek : handleNextDay}
        >
          ❯
        </button>

        <div className="text-base font-semibold ml-4 text-gray-800">
          {calendarView === 'week'
            ? formatDateRange(weekStartDate)
            : formatSingleDate(selectedDate)}
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4 view-selector-container">
          <button
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 shadow-sm transition-colors duration-150 min-w-24"
            onClick={toggleViewSelector}
            aria-expanded={showViewSelector}
            aria-haspopup="true"
          >
            <span>{calendarView === 'week' ? 'Week' : 'Day'}</span>
            <span className="ml-2 text-gray-600">▼</span>
          </button>

          {showViewSelector && (
            <div className="absolute top-full mt-1 right-0 z-20 min-w-full w-28 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div
                className={`p-2 cursor-pointer text-sm text-gray-900 hover:bg-gray-100 transition-colors duration-150 ${
                  calendarView === 'day' ? 'bg-blue-50 font-semibold text-blue-700' : ''
                }`}
                onClick={() => selectView('day')}
              >
                Day
              </div>
              <div
                className={`p-2 cursor-pointer text-sm text-gray-900 hover:bg-gray-100 transition-colors duration-150 ${
                  calendarView === 'week' ? 'bg-blue-50 font-semibold text-blue-700' : ''
                }`}
                onClick={() => selectView('week')}
              >
                Week
              </div>
            </div>
          )}
        </div>

        <button className="bg-blue-500 border-none text-white py-2 px-3 rounded flex items-center cursor-pointer hover:bg-blue-600">
          <Filter className="text-white w-4 h-4" />
          <span className="ml-2">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;