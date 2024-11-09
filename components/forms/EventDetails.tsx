'use client';

import { PhotoShootEvent } from '@/types/event';
import { Button } from '@/components/ui/button';
import { AttachmentsList } from '../calendar/AttachmentsList';
import { format } from 'date-fns';

interface EventDetailsProps {
  event: PhotoShootEvent;
  onEdit: () => void;
  onDelete: () => void;
}

export function EventDetails({ event, onEdit, onDelete }: EventDetailsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="text-right font-semibold">依頼者:</div>
        <div className="col-span-3">{event.title}</div>

        <div className="text-right font-semibold">連絡先（TEL）:</div>
        <div className="col-span-3">{event.tel}</div>

        <div className="text-right font-semibold">撮影日:</div>
        <div className="col-span-3">
          {event.shootingDate ? format(new Date(event.shootingDate), 'yyyy年MM月dd日') : ''}
        </div>

        <div className="text-right font-semibold">依頼時間:</div>
        <div className="col-span-3">{`${event.requestTimeStart || ''} ～ ${event.requestTimeEnd || ''}`}</div>

        <div className="text-right font-semibold">場所:</div>
        <div className="col-span-3">{event.location}</div>

        <div className="text-right font-semibold">納品タイミング:</div>
        <div className="col-span-3">{event.deliveryTiming}</div>

        <div className="text-right font-semibold">納品URL:</div>
        <div className="col-span-3">{event.deliveryUrl}</div>

        <div className="text-right font-semibold">Notes:</div>
        <div className="col-span-3">{event.notes}</div>
      </div>

      {event.attachments && event.attachments.length > 0 && (
        <AttachmentsList
          files={event.attachments}
          onRemove={() => {}}
          isReadOnly={true}
        />
      )}

      <div className="flex justify-between mt-6">
        <Button onClick={onEdit}>編集</Button>
        <Button onClick={onDelete} variant="destructive">削除</Button>
      </div>
    </div>
  );
}