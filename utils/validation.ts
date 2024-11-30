import { PhotoShootEvent } from '@/types/event';
import { useMemo } from 'react';

// 通常のバリデーション関数
export const validateForm = (event: Partial<PhotoShootEvent>) => {
  const errors: Record<string, string> = {};

  if (!event.title?.trim()) {
    errors.title = '依頼者名は必須です';
  }

  if (!event.tel?.trim()) {
    errors.tel = '電話番号は必須です';
  }

  if (!event.shooting_date) {
    errors.shooting_date = '撮影日は必須です';
  }

  if (!event.start_time) {
    errors.start_time = '開始時間は必須です';
  }

  if (!event.end_time) {
    errors.end_time = '終了時間は必須です';
  }

  return Object.keys(errors).length === 0;
};

// フックとして使用する最適化されたバリデーション
export const useFormValidation = (formData: Partial<PhotoShootEvent>) => {
  return useMemo(() => {
    const errors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      errors.title = '依頼者名は必須です';
    }

    if (!formData.tel?.trim()) {
      errors.tel = '電話番号は必須です';
    }

    if (!formData.shooting_date) {
      errors.shooting_date = '撮影日は必須です';
    }

    if (!formData.start_time) {
      errors.start_time = '開始時間は必須です';
    }

    if (!formData.end_time) {
      errors.end_time = '終了時間は必須です';
    }

    return errors;
  }, [formData]);
};
