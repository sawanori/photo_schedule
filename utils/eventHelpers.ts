import { PhotoShootEvent } from '@/types/event';

export const cleanEventDataForUpdate = (event: Partial<PhotoShootEvent>) => {
  // 更新に必要なフィールドのみを抽出
  const {
    title,
    tel,
    shooting_date,
    start_time,
    end_time,
    location,
    notes,
    photographer_id
  } = event;

  return {
    title,
    tel,
    shooting_date,
    start_time,
    end_time,
    location,
    notes,
    photographer_id
  };
};
