'use client';

import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhotoShootEvent } from '@/types/event';

interface EventFormProps {
  event: Partial<PhotoShootEvent>;
  onSubmit: (event: Partial<PhotoShootEvent>) => Promise<void>;
  onCancel: () => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

export function EventForm({ event, onSubmit, onCancel, errors, isSubmitting }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<PhotoShootEvent>>(event || {
    title: '',
    tel: '',
    shooting_date: '',
    start_time: '',
    end_time: '',
    location: '',
    notes: ''
  });

  const handleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }, 100),
    []
  );

  const formValues = useMemo(() => ({
    ...formData
  }), [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      {/* 依頼者名（必須） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">依頼者</Label>
        <Input
          id="title"
          name="title"
          defaultValue={formValues.title}
          onChange={handleInputChange}
          className={`col-span-3 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.title}</p>}
      </div>

      {/* 電話番号（必須） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tel" className="text-right">連絡先（TEL）</Label>
        <Input
          id="tel"
          name="tel"
          defaultValue={formValues.tel}
          onChange={handleInputChange}
          className={`col-span-3 ${errors.tel ? 'border-red-500' : ''}`}
        />
        {errors.tel && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.tel}</p>}
      </div>

      {/* 撮影日（必須） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="shooting_date" className="text-right">撮影日</Label>
        <Input
          id="shooting_date"
          type="date"
          name="shooting_date"
          defaultValue={formValues.shooting_date}
          onChange={handleInputChange}
          className={`col-span-3 ${errors.shooting_date ? 'border-red-500' : ''}`}
        />
        {errors.shooting_date && <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.shooting_date}</p>}
      </div>

      {/* 撮影時間（必須） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="time" className="text-right">撮影時間</Label>
        <div className="col-span-3 flex items-center gap-2">
          <Input
            id="start_time"
            type="time"
            name="start_time"
            defaultValue={formValues.start_time}
            onChange={handleInputChange}
            className={`w-1/2 ${errors.start_time ? 'border-red-500' : ''}`}
          />
          <span>～</span>
          <Input
            id="end_time"
            type="time"
            name="end_time"
            defaultValue={formValues.end_time}
            onChange={handleInputChange}
            className={`w-1/2 ${errors.end_time ? 'border-red-500' : ''}`}
          />
        </div>
        {(errors.start_time || errors.end_time) && 
          <p className="text-red-500 text-sm col-start-2 col-span-3">
            {errors.start_time || errors.end_time}
          </p>
        }
      </div>

      {/* 撮影場所（任意） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">場所</Label>
        <Input
          id="location"
          name="location"
          defaultValue={formValues.location}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      {/* 備考（任意） */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="text-right">備考</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={formValues.notes}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>

      {/* ボタン */}
      <div className="flex justify-between mt-6">
        <Button type="button" onClick={onCancel} variant="outline">
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : (event.id ? '更新' : '登録')}
        </Button>
      </div>
    </form>
  );
}