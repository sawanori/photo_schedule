'use client';

import { useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import { localizer, calendarFormats, CalendarView } from '@/lib/calendar-config';
import { ViewControls } from './calendar/ViewControls';
import { EventComponent } from './calendar/EventComponent';
import { EventForm } from './forms/EventForm';
import { EventDetails } from './forms/EventDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhotoShootEvent } from '@/types/event';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type NavigateAction = 'PREV' | 'NEXT' | 'TODAY';

export default function PhotoShootCalendar() {
  const [events, setEvents] = useState<PhotoShootEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PhotoShootEvent | null>(null);
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [view, setView] = useState<CalendarView>('month');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const validateForm = (event: Partial<PhotoShootEvent>) => {
    const newErrors: Record<string, string> = {};
    if (!event.title) newErrors.title = '依頼者は必須です';
    if (!event.tel) newErrors.tel = '連絡先（TEL）は必須です';
    if (!event.shootingDate) newErrors.shootingDate = '撮影日は必須です';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEvent = (newEvent: Partial<PhotoShootEvent>) => {
    if (validateForm(newEvent)) {
      const eventToAdd = {
        ...newEvent,
        id: Date.now().toString(),
        start: newEvent.shootingDate instanceof Date 
          ? newEvent.shootingDate 
          : new Date(newEvent.shootingDate || ''),
        end: newEvent.shootingDate instanceof Date 
          ? newEvent.shootingDate 
          : new Date(newEvent.shootingDate || ''),
      } as PhotoShootEvent;
      
      setEvents([...events, eventToAdd]);
      setShowAddNewEvent(false);
    }
  };
  const handleUpdateEvent = (updatedEvent: Partial<PhotoShootEvent>) => {
    if (selectedEvent && validateForm(updatedEvent)) {
      const updatedEventFull = {
        ...selectedEvent,
        ...updatedEvent,
        start: updatedEvent.shootingDate instanceof Date 
          ? updatedEvent.shootingDate 
          : new Date(updatedEvent.shootingDate || ''),
        end: updatedEvent.shootingDate instanceof Date 
          ? updatedEvent.shootingDate 
          : new Date(updatedEvent.shootingDate || ''),
      };
      setEvents(events.map(e => e.id === selectedEvent.id ? updatedEventFull : e));
      setSelectedEvent(null);
      setIsEditing(false);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleNavigate = (action: NavigateAction) => {
    const newDate = new Date(currentDate);
    
    switch (action) {
      case 'PREV':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else {
          newDate.setDate(newDate.getDate() - 1);
        }
        break;
      case 'NEXT':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else {
          newDate.setDate(newDate.getDate() + 1);
        }
        break;
      case 'TODAY':
        newDate.setTime(new Date().getTime());
        break;
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">加藤の撮影スケジュール</h1>
      
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Calendar<PhotoShootEvent>
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={event => setSelectedEvent(event)}
            view={view as View}  // View型にキャストする
            date={currentDate}
            onView={(newView: View) => setView(newView as CalendarView)}  // 型の変換を適切に行う
            onNavigate={(newDate: Date) => setCurrentDate(newDate)}
            components={{
              event: EventComponent
            }}
            formats={calendarFormats}
        />
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={() => setShowAddNewEvent(true)} className="px-6 py-3 text-lg">
          依頼登録
        </Button>
      </div>

      <Dialog open={showAddNewEvent} onOpenChange={setShowAddNewEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規予約登録</DialogTitle>
          </DialogHeader>
          <EventForm
            event={{}}
            onSubmit={handleAddEvent}
            onCancel={() => setShowAddNewEvent(false)}
            errors={errors}
          />
        </DialogContent>
      </Dialog>

      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? '予約編集' : '予約詳細'}</DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <EventForm
                event={selectedEvent}
                onSubmit={handleUpdateEvent}
                onCancel={() => setIsEditing(false)}
                errors={errors}
                isEditing={true}
              />
            ) : (
              <EventDetails
                event={selectedEvent}
                onEdit={handleEditClick}
                onDelete={handleDeleteEvent}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}