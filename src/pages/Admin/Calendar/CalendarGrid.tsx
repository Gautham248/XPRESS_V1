import React from 'react';
import { CalendarEvent, CalendarView } from './types';
import EventCard from './EventCard';

interface CalendarGridProps {
  calendarView: CalendarView;
  selectedDate: Date;
  weekDays: Date[];
  getEventsForDate: (date: Date) => CalendarEvent[];
  isToday: (date: Date) => boolean;
  isSelectedDate: (date: Date) => boolean;
  handleDateSelect: (date: Date) => void;
  handleEventClick: (requestId: string) => void; 
}

const CalendarGrid = ({
  calendarView,
  selectedDate,
  weekDays,
  getEventsForDate,
  isToday,
  isSelectedDate,
  handleDateSelect,
  handleEventClick,
}: CalendarGridProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 bg-white calendar-grid">
      <div>
        <div className="sticky top-0 z-10 bg-white">
          {calendarView === 'week' ? (
            <div className="grid grid-cols-7">
              {weekDays.map((day, index) => {
                const isCurrentDay = isToday(day);
                const isSelected = isSelectedDate(day);
                const dayOfWeek = day.toLocaleString('default', { weekday: 'short' });
                const dayOfMonth = day.getDate();
                const dayEvents = getEventsForDate(day);
                const hasEvents = dayEvents.length > 0;
                const highlightColor = ''; // Remove the border

                return (
                  <div
                    key={index}
                    className={`py-4 text-center border-b border-gray-200 cursor-pointer ${highlightColor} ${
                      isSelected ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleDateSelect(day)}
                  >
                    <div
                      className={`text-2xl font-semibold ${
                        isCurrentDay ? 'text-blue-500' : 'text-gray-800'
                      } ${isSelected ? 'text-blue-600' : ''}`}
                    >
                      {dayOfMonth}
                    </div>
                    <div
                      className={`text-sm ${
                        isCurrentDay ? 'text-blue-500' : 'text-gray-500'
                      } ${isSelected ? 'text-blue-600' : ''}`}
                    >
                      {dayOfWeek}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-3 text-center border-b border-gray-200 bg-white">
              <div
                className={`text-2xl font-semibold ${
                  isToday(selectedDate) ? 'text-blue-500' : 'text-gray-800'
                }`}
              >
                {selectedDate.getDate()}
              </div>
              <div
                className={`text-sm ${
                  isToday(selectedDate) ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                {selectedDate.toLocaleString('default', { weekday: 'long' })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {calendarView === 'week' ? (
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDate(day);

                return (
                  <div key={dayIndex} className="flex flex-col gap-2">
                    {dayEvents.length > 0 ? (
                      dayEvents.map((event, eventIndex) => (
                        <EventCard
                          key={eventIndex}
                          event={event}
                          onClick={handleEventClick}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-400 text-xs py-2">
                        No events
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              {(() => {
                const dayEvents = getEventsForDate(selectedDate);

                return dayEvents.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {dayEvents.map((event, eventIndex) => (
                      <EventCard
                        key={eventIndex}
                        event={event}
                        onClick={handleEventClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    No events for this day
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;