import { CalendarEvent } from './types';

interface EventCardProps {
  event: CalendarEvent;
  onClick: (requestId: string) => void;
}

const colorMappings = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-l-4 border-blue-500',
    text: 'text-blue-800',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-l-4 border-indigo-500',
    text: 'text-indigo-800',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-l-4 border-green-500',
    text: 'text-green-800',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-l-4 border-purple-500',
    text: 'text-purple-800',
  },
};

const EventCard = ({ event, onClick }: EventCardProps) => {
  const { bg, border, text } = colorMappings[event.color as keyof typeof colorMappings];
  
  return (
    <div 
      className={`p-4 mb-2 rounded ${bg} ${border} cursor-pointer`}
      onClick={() => onClick(event.details.requestId)}
    >
      <div className={`text-sm font-medium ${text}`}>
        {event.eventType === 'departure' ? 'Departure' : 'Return'}
      </div>
      <div className="text-gray-800 font-semibold">
        {event.title.split('(')[0].trim()}
      </div>
    </div>
  );
};

export default EventCard;