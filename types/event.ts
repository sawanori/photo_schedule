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
  shootingDate: Date;
  start: Date;
  end: Date;
  description?: string;
  location?: string; 
  requestTimeStart?: string;
  requestTimeEnd?: string;
  deliveryTiming?: string;
  deliveryUrl?: string;
  attachments?: File[];
  photographer?: {
    id?: string;
    name?: string;
    email?: string;
  };
  client?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price?: number;
  packageType?: 'basic' | 'standard' | 'premium';
  numberOfPeople?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;  // オプショナルを削除
}