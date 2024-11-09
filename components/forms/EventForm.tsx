'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { PhotoShootEvent } from '@/types/event';
import { AttachmentsList } from '../calendar/AttachmentsList';
import { format } from 'date-fns';

interface EventFormProps {
  event: Partial<PhotoShootEvent>;
  onSubmit: (event: Partial<PhotoShootEvent>) => void;
  onCancel: () => void;
  errors: Record<string, string>;
  isEditing?: boolean;
}

export function EventForm({ event, onSubmit, onCancel, errors, isEditing }: EventFormProps) {
  const [formData, setFormData] = useState(event);
  const [attachments, setAttachments] = useState<File[]>(
    Array.isArray(event.attachments) ? event.attachments : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, attachments });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (file: File) => {
    setAttachments(attachments.filter(f => f !== file));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">依頼者</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className={`col-span-3 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tel" className="text-right">連絡先（TEL）</Label>
        <Input
          id="tel"
          value={formData.tel || ''}
          onChange={e => setFormData({ ...formData, tel: e.target.value })}
          className={`col-span-3 ${errors.tel ? 'border-red-500' : ''}`}
        />
        {errors.tel && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.tel}</p>}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="shooting-date" className="text-right">撮影日</Label>
        <Input
          id="shooting-date"
          type="date"
          value={formData.shootingDate ? format(new Date(formData.shootingDate), 'yyyy-MM-dd') : ''}
          onChange={e => setFormData({ 
            ...formData, 
            shootingDate: e.target.value ? new Date(e.target.value) : undefined 
          })}
          className={`col-span-3 ${errors.shootingDate ? 'border-red-500' : ''}`}
        />
        {errors.shootingDate && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.shootingDate}</p>}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="request-time" className="text-right">依頼時間</Label>
        <div className="col-span-3 flex items-center gap-2">
          <Input
            id="request-time-start"
            type="time"
            value={formData.requestTimeStart || ''}
            onChange={e => setFormData({ ...formData, requestTimeStart: e.target.value })}
            className="w-1/2"
          />
          <span>～</span>
          <Input
            id="request-time-end"
            type="time"
            value={formData.requestTimeEnd || ''}
            onChange={e => setFormData({ ...formData, requestTimeEnd: e.target.value })}
            className="w-1/2"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">場所</Label>
        <Input
          id="location"
          value={formData.location || ''}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="delivery-timing" className="text-right">納品タイミング</Label>
        <Input
          id="delivery-timing"
          type="datetime-local"
          value={formData.deliveryTiming || ''}
          onChange={e => setFormData({ ...formData, deliveryTiming: e.target.value })}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="delivery-url" className="text-right">納品URL</Label>
        <Input
          id="delivery-url"
          type="url"
          value={formData.deliveryUrl || ''}
          onChange={e => setFormData({ ...formData, deliveryUrl: e.target.value })}
          className="col-span-3"
          placeholder="https://"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="file-upload" className="text-right">参考ファイル</Label>
        <div className="col-span-3">
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
            ref={fileInputRef}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            ファイルを選択
          </Button>
        </div>
      </div>

      <AttachmentsList
        files={attachments}
        onRemove={handleRemoveFile}
        isReadOnly={isEditing}
      />

      <div className="flex justify-between mt-6">
        <Button type="button" onClick={onCancel} variant="outline">キャンセル</Button>
        <Button type="submit">{isEditing ? '更新' : '登録'}</Button>
      </div>
    </form>
  );
}