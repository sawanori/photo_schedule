export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  notes?: string;
  requestTimeStart?: string;
  requestTimeEnd?: string;
  location?: string;
  deliveryTiming?: string;
  deliveryUrl?: string;
  attachments?: File[];
}

export interface PhotoShootEvent {
  id: string;
  title: string;
  tel: string;
  shooting_date: string;
  start_time: string;
  end_time: string;
  location: string;
  notes?: string;
  photographer_id?: string;
  created_at?: string;
  updated_at?: string;
  photographer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  // カレンダー表示用
  start?: Date;
  end?: Date;
}