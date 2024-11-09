'use client';

import { PhotoShootEvent } from '@/types/event';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale'; // 日本語ロケールを追加

interface EventDetailsProps {
  event: PhotoShootEvent;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function EventDetails({ event, onEdit, onDelete, isDeleting }: EventDetailsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 gap-2">
        {/* 依頼者（必須） */}
        <div className="text-right font-semibold">依頼者:</div>
        <div className="col-span-3">{event.title}</div>

        {/* 電話番号（必須） */}
        <div className="text-right font-semibold">連絡先（TEL）:</div>
        <div className="col-span-3">{event.tel}</div>

        {/* 撮影日（必須） */}
        <div className="text-right font-semibold">撮影日:</div>
        <div className="col-span-3">
          {event.shooting_date ? format(new Date(event.shooting_date), 'yyyy年MM月dd日(E)', { locale: ja }) : ''}
        </div>

        {/* 撮影時間（必須） */}
        <div className="text-right font-semibold">撮影時間:</div>
        <div className="col-span-3">
          {event.start_time && event.end_time 
            ? `${event.start_time.substring(0, 5)} ～ ${event.end_time.substring(0, 5)}`
            : ''
          }
        </div>

        {/* 撮影場所（任意） */}
        <div className="text-right font-semibold">場所:</div>
        <div className="col-span-3">{event.location || '未設定'}</div>

        {/* 備考（任意） */}
        <div className="text-right font-semibold">備考:</div>
        <div className="col-span-3 whitespace-pre-wrap">{event.notes || '未設定'}</div>

        {/* 登録日時 */}
        <div className="text-right font-semibold">登録日時:</div>
        <div className="col-span-3">
          {event.created_at 
            ? format(new Date(event.created_at), 'yyyy/MM/dd HH:mm', { locale: ja })
            : ''
          }
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={onEdit}>編集</Button>
        <Button 
          onClick={onDelete} 
          variant="destructive" 
          disabled={isDeleting}
        >
          {isDeleting ? '削除中...' : '削除'}
        </Button>
      </div>
    </div>
  );
}