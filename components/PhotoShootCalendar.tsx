'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api'; 
import { Calendar, View } from 'react-big-calendar';
import { localizer, calendarFormats, CalendarView } from '@/lib/calendar-config';
import { ViewControls } from './calendar/ViewControls';
import { EventComponent } from './calendar/EventComponent';
import { EventForm } from './forms/EventForm';
import { EventDetails } from './forms/EventDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PhotoShootEvent } from '@/types/event';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { cleanEventDataForUpdate } from '@/utils/eventHelpers';
type NavigateAction = 'PREV' | 'NEXT' | 'TODAY';

export default function PhotoShootCalendar() {
  const [events, setEvents] = useState<PhotoShootEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PhotoShootEvent | null>(null);
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [view, setView] = useState<CalendarView>('month');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await api.fetchEvents();
        setEvents(data.map((event: PhotoShootEvent) => ({
          ...event,
          start: new Date(`${event.shooting_date}T${event.start_time}`),
          end: new Date(`${event.shooting_date}T${event.end_time}`)
        })));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  const validateForm = (event: Partial<PhotoShootEvent>) => {
    const newErrors: Record<string, string> = {};
    
    // 必須フィールドのチェック（NOT NULL制約に対応）
    if (!event.title) newErrors.title = '依頼者は必須です';
    if (!event.tel) newErrors.tel = '連絡先（TEL）は必須です';
    if (!event.shooting_date) newErrors.shooting_date = '撮影日は必須です';
    if (!event.start_time) newErrors.start_time = '開始時間は必須です';
    if (!event.end_time) newErrors.end_time = '終了時間は必須です';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAddEvent = async (newEvent: Partial<PhotoShootEvent>) => {
    if (validateForm(newEvent)) {
      try {
        setIsSubmitting(true);
        const createdEvent = await api.createEvent(newEvent);
        setEvents([...events, {
          ...createdEvent,
          start: new Date(`${createdEvent.shooting_date}T${createdEvent.start_time}`),
          end: new Date(`${createdEvent.shooting_date}T${createdEvent.end_time}`)
        }]);
        setShowAddNewEvent(false);
        console.log('イベントを作成しました');
      } catch (error) {
        console.error('Failed to add event:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleUpdateEvent = async (updatedEvent: Partial<PhotoShootEvent>) => {
    if (selectedEvent && validateForm(updatedEvent)) {
      try {
        setIsSubmitting(true);
      

        const cleanedData = cleanEventDataForUpdate(updatedEvent);
        console.log('Cleaned update data:', cleanedData); 
      // Supabase APIを使用して更新
      const updatedEventData = await api.updateEvent(selectedEvent.id, cleanedData);
      
      // 更新されたイベントデータでstateを更新
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? {
              ...updatedEventData,
              start: new Date(`${updatedEventData.shooting_date}T${updatedEventData.start_time}`),
              end: new Date(`${updatedEventData.shooting_date}T${updatedEventData.end_time}`)
            }
          : e
      ));
      
      setSelectedEvent(null);
      setIsEditing(false);
      
      console.log('イベントを更新しました！');
    } catch (error) {
      console.error('Failed to update event:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
};

const handleDeleteEvent = async () => {
  if (selectedEvent) {
    try {
      setIsDeleting(true);
      
      // Supabase APIを使用して削除
      await api.deleteEvent(selectedEvent.id);
      
      // 削除されたイベントをstateから除去
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      
      console.log('イベントを削除しました');
    } catch (error) {
      console.error('Failed to delete event:', error);
    } finally {
      setIsDeleting(false);
    }
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

  const handleFormSubmit = useCallback(async (formData: Partial<PhotoShootEvent>) => {
    try {
      setIsSubmitting(true);
      const cleanedData = cleanEventDataForUpdate(formData);
      
      if (selectedEvent) {
        await handleUpdateEvent(cleanedData);
      } else {
        await handleAddEvent(cleanedData);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedEvent]);

  const updateEventsList = useCallback((newEvent: PhotoShootEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === newEvent.id ? newEvent : event
    ));
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">加藤撮影スケジュール</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[600px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Calendar<PhotoShootEvent>
            localizer={localizer}
            culture="ja"
            events={events}
            startAccessor={(event: PhotoShootEvent) => 
              new Date(`${event.shooting_date}T${event.start_time}`)
            }
            endAccessor={(event: PhotoShootEvent) => 
              new Date(`${event.shooting_date}T${event.end_time}`)
            }
            style={{ height: 600 }}
            onSelectEvent={event => setSelectedEvent(event)}
            view={view as View}
            date={currentDate}
            onView={(newView: View) => setView(newView as CalendarView)}
            onNavigate={(newDate: Date) => setCurrentDate(newDate)}
            components={{
              event: EventComponent
            }}
            formats={calendarFormats}
          />
        </div>
      )}
  
      <div className="flex justify-center mt-8">
        <Button onClick={() => setShowAddNewEvent(true)} className="px-6 py-3 text-lg">
          依頼登録
        </Button>
      </div>
  
      <Dialog open={showAddNewEvent} onOpenChange={setShowAddNewEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規撮影依頼登録</DialogTitle>
          </DialogHeader>
          <EventForm
            event={{} as Partial<PhotoShootEvent>}  
            onSubmit={handleAddEvent}
            onCancel={() => setShowAddNewEvent(false)}
            errors={errors}
            isSubmitting={isSubmitting}
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
                isSubmitting={isSubmitting}
              />
            ) : (
              <EventDetails
                event={selectedEvent}
                onEdit={handleEditClick}
                onDelete={handleDeleteEvent}
                isDeleting={isDeleting}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}