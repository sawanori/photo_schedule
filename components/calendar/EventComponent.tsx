import { Event } from 'react-big-calendar';
import { PhotoShootEvent } from '@/types/event';

interface EventComponentProps {
  event: PhotoShootEvent & Event;
  title: string;
}

export const EventComponent: React.FC<EventComponentProps> = ({ event, title }) => {
  return (
    <div className="px-2 py-1">
      <div className="font-semibold">{title}</div>
    </div>
  );
};