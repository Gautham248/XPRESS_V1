import { CalendarEvent } from './types';

interface EventCardProps {
  event: CalendarEvent;
  onClick: (requestId: string) => void;
}

const colorMappings = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-l-4 border-blue-500',
    text: 'text-blue-700',
    lightText: 'text-blue-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-l-4 border-indigo-500',
    text: 'text-indigo-700',
    lightText: 'text-indigo-600',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-l-4 border-green-500',
    text: 'text-green-700',
    lightText: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-l-4 border-purple-500',
    text: 'text-purple-700',
    lightText: 'text-purple-600',
  },
};

const EventCard = ({ event, onClick }: EventCardProps) => {
  // Set different colors based on event type
  const eventTypeColor = event.eventType === 'departure' ? 'indigo' : 'green';
  const { bg, border, text, lightText } = colorMappings[eventTypeColor];
 
  return (
    <div
      className={`p-3 mb-2 rounded-lg shadow-sm ${bg} ${border} hover:shadow-md transition-shadow duration-200 cursor-pointer transform hover:translate-y-px`}
      onClick={() => onClick(event.details.requestId)}
    >
      <div className={`text-sm font-bold ${text} mb-1`}>
        {event.eventType === 'departure' ? 'Departure' : 'Return'}
      </div>
      <div className={`text-xs ${lightText}`}>
        {event.title.split('(')[0].trim()}
      </div>
    </div>
  );
};

export default EventCard;