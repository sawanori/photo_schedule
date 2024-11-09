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
  // Primary Key
  id: string;  // UUID

  // Foreign Keys
  photographer_id?: string;  // UUID, optional
  client_id?: string;       // UUID, optional

  // Required fields (NOT NULL)
  title: string;           // VARCHAR(255) NOT NULL
  tel: string;            // VARCHAR(20) NOT NULL
  shooting_date: string;   // DATE NOT NULL
  start_time: string;     // TIME NOT NULL
  end_time: string;       // TIME NOT NULL

  // Optional fields
  request_time_start?: string;  // VARCHAR(10)
  request_time_end?: string;    // VARCHAR(10)
  location?: string;            // VARCHAR(255)
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';  // VARCHAR(20) DEFAULT 'pending'
  price?: number;               // DECIMAL(10,2)
  package_type?: 'basic' | 'standard' | 'premium';  // VARCHAR(20)
  number_of_people?: number;    // INTEGER
  delivery_timing?: string;     // VARCHAR(255)
  delivery_url?: string;        // VARCHAR(255)
  notes?: string;              // TEXT

  // Timestamps
  created_at: string;  // TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  updated_at: string;  // TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

  // Relationships (JOINed data)
  photographer?: {
    id: string;           // UUID
    name: string;         // VARCHAR(255) NOT NULL
    email: string;        // VARCHAR(255) NOT NULL UNIQUE
    phone?: string;       // VARCHAR(20)
  };

  client?: {
    id: string;          // UUID
    name: string;        // VARCHAR(255) NOT NULL
    email?: string;      // VARCHAR(255)
    phone: string;       // VARCHAR(20) NOT NULL
  };

  attachments?: {
    id: string;          // UUID
    file_name: string;   // VARCHAR(255) NOT NULL
    file_path: string;   // VARCHAR(255) NOT NULL
    file_type?: string;  // VARCHAR(50)
    file_size?: number;  // INTEGER
  }[];
}