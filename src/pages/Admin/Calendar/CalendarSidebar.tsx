import { useState } from 'react';
import { CalendarDay } from './types';

interface CalendarSidebarProps {
  currentMonth: Date;
  selectedDate: Date;
  showMonthSelector: boolean;
  setCurrentMonth: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  toggleMonthSelector: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  generateMonthDays: () => CalendarDay[];
  isToday: (date: Date) => boolean;
  isSelectedDate: (date: Date) => boolean;
  handleDateSelect: (date: Date) => void;
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

const CalendarSidebar = ({
  currentMonth,
  selectedDate,
  showMonthSelector,
  setCurrentMonth,
  toggleMonthSelector,
  handlePrevMonth,
  handleNextMonth,
  generateMonthDays,
  isToday,
  isSelectedDate,
  handleDateSelect,
}: CalendarSidebarProps) => {
  const formattedMonthYear = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const selectMonth = (month: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), month, currentMonth.getDate())
    );
    toggleMonthSelector();
  };

  return (
    <div className="w-64 p-4 border-r border-gray-200 flex flex-col bg-white">
      <div className="text-2xl font-semibold mb-5 text-gray-800">Calendar</div>

      <div className="flex justify-between items-center mb-4">
        <div
          className="text-base flex items-center cursor-pointer text-gray-800"
          onClick={toggleMonthSelector}
        >
          <span>{formattedMonthYear}</span>
          <span className="ml-1 text-xs text-gray-600">▼</span>
        </div>

        <div>
          <button
            className="bg-transparent border-none text-gray-800 cursor-pointer px-2 py-1 mx-0.5 rounded hover:bg-gray-100"
            onClick={handlePrevMonth}
          >
            ❮
          </button>
          <button
            className="bg-transparent border-none text-gray-800 cursor-pointer px-2 py-1 mx-0.5 rounded hover:bg-gray-100"
            onClick={handleNextMonth}
          >
            ❯
          </button>
        </div>
      </div>

      {showMonthSelector && (
        <div className="bg-white rounded shadow-md border border-gray-200 mb-5">
          <div className="flex justify-between items-center p-2 border-b border-gray-200 text-gray-800">
            <span>{currentMonth.getFullYear()}</span>
            <div>
              <button
                className="bg-transparent border-none text-gray-800 cursor-pointer px-2 py-1 mx-0.5 rounded hover:bg-gray-100"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear() - 1,
                      currentMonth.getMonth(),
                      currentMonth.getDate()
                    )
                  )
                }
              >
                ❮
              </button>
              <button
                className="bg-transparent border-none text-gray-800 cursor-pointer px-2 py-1 mx-0.5 rounded hover:bg-gray-100"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear() + 1,
                      currentMonth.getMonth(),
                      currentMonth.getDate()
                    )
                  )
                }
              >
                ❯
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4">
            {monthNames.map((month, index) => (
              <div
                key={index}
                className={`text-center py-2 px-1 rounded cursor-pointer ${
                  currentMonth.getMonth() === index
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => selectMonth(index)}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      )}

      {!showMonthSelector && (
        <div className="px-4">
          <div className="grid grid-cols-7 text-center mb-1 text-sm text-gray-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {generateMonthDays().map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day.date)}
                className={`
                  bg-transparent border-none h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm m-0.5 mx-auto
                  ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-800'} 
                  ${isToday(day.date) ? 'bg-blue-500 text-white' : ''}
                  ${
                    isSelectedDate(day.date) && !isToday(day.date)
                      ? 'bg-blue-100 text-blue-500'
                      : ''
                  }
                  hover:bg-gray-100
                `}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSidebar;