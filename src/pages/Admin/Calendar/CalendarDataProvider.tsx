import { useState, ReactNode } from 'react';
import { CalendarEvent } from './types';
import { dummyTravelRequests } from '../../../utils/travelRequestData';

interface CalendarDataProviderProps {
  children: (props: {
    events: CalendarEvent[];
    getEventsForDate: (date: Date) => CalendarEvent[];
  }) => ReactNode;
  selectedDate: Date;
}

const CalendarDataProvider = ({
  children,
  selectedDate,
}: CalendarDataProviderProps) => {
  const generateEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    let eventId = 1;
    
    // Only display approved trips or tickets dispatched
    const approvedStatuses = ['Manager Approved', 'Tickets Dispatched'];
    
    dummyTravelRequests
      .filter(request => approvedStatuses.includes(request.status))
      .forEach(request => {
        // Assign a color based on the travel type
        const color = request.travelType === 'International' ? 'purple' : 'blue';
        
        // Departure event
        events.push({
          id: eventId++,
          title: `${request.name} (${request.source} → ${request.destination})`,
          date: new Date(request.travelDates.departureDate + 'T00:00:00'),
          eventType: 'departure',
          color,
          details: {
            requestId: request.requestId,
            status: request.status,
            travelType: request.travelType,
            projectCode: request.projectCode
          }
        });
        
        // Return event
        events.push({
          id: eventId++,
          title: `${request.name} (${request.destination} → ${request.source})`,
          date: new Date(request.travelDates.returnDate + 'T00:00:00'),
          eventType: 'return',
          color,
          details: {
            requestId: request.requestId,
            status: request.status,
            travelType: request.travelType,
            projectCode: request.projectCode
          }
        });
      });
      
    return events;
  };

  const [events] = useState<CalendarEvent[]>(generateEvents());

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      // Normalize dates to compare only year, month, and day
      const eventDate = event.date;
      
      // Remove time components for accurate date comparison
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      
      const compareYear = date.getFullYear();
      const compareMonth = date.getMonth();
      const compareDay = date.getDate();
      
      return (
        eventYear === compareYear &&
        eventMonth === compareMonth &&
        eventDay === compareDay
      );
    });
  };

  return children({ events, getEventsForDate });
};

export default CalendarDataProvider;