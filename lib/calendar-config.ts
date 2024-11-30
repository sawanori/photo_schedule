import { dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja'; 

export type CalendarView = View;

const locales = {
  'en-US': enUS,
  'ja': ja, 
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const calendarFormats = {
  monthHeaderFormat: 'yyyy年M月',
  weekdayHeaderFormat: 'ddd',
  dayHeaderFormat: 'M月d日 dddd',
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'yyyy年M月d日')} - ${format(end, 'yyyy年M月d日')}`,
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`,
};