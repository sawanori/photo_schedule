'use client';

import { Button } from '@/components/ui/button';
import { Event } from '@/types/event';
import { PhotoShootEvent } from '@/types/photoShootEvent';

interface EventConfirmationProps {
  event: Partial<PhotoShootEvent>;
  attachments: File[];
  onBack: () => void;
  onConfirm: () => void;
}

export const EventConfirmation = ({
  event,
  attachments,
  onBack,
  onConfirm,
}: EventConfirmationProps) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <p><strong>依頼者:</strong> {event.title}</p>
        <p><strong>連絡先（TEL）:</strong> {event.tel}</p>
        <p><strong>撮影日:</strong> {event.shootingDate}</p>
        <p><strong>依頼時間:</strong> {event.requestTimeStart} ～ {event.requestTimeEnd}</p>
        <p><strong>場所:</strong> {event.location}</p>
        <p><strong>納品タイミング:</strong> {event.deliveryTiming}</p>
        <p><strong>納品URL:</strong> {event.deliveryUrl}</p>
        <p><strong>Notes:</strong> {event.notes}</p>
        <p><strong>添付ファイル:</strong> {attachments.map(file => file.name).join(', ')}</p>
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack}>戻る</Button>
        <Button onClick={onConfirm}>確定</Button>
      </div>
    </>
  );
};