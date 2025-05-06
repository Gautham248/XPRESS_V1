export interface CalendarEvent {
    id: number;
    title: string;
    date: Date;
    eventType: 'departure' | 'return';
    color: string;
    details: {
      requestId: string;
      status: string;
      travelType: string;
      projectCode: string;
    };
  }
  
  
  export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
  }
  
  export type CalendarView = 'week' | 'day';