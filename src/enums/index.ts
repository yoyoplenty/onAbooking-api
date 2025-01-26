export enum ROLE {
  GUEST = 'quest',
  HOST = 'host',
  ADMIN = 'admin',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PROPERTY_TYPE {
  APARTMENT = 'apartment',
  HOTEL = 'hotel',
}

export enum TOKEN_TYPE {
  EMAIL = 'email',
  PHONE = 'phone',
}

export enum TRANSACTION_TYPE {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum REVIEW_TYPE {
  PROPERTY = 'property',
  HOST = 'host',
}

export enum PROPERTY_FILE_TYPE {
  VIDEO = 'video',
  IMAGE = 'image',
}

export enum PROPERTY_STATUS {
  AVAILABLE = 'available',
  BOOKED = 'booked',
}

export enum BOOKING_STATUS {
  PENDING = 'available',
  ACCEPTED = 'booked',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

export enum PAYMENT_STATUS {
  UNPAID = 'unpaid',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

export enum TRANSACTION_STATUS {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETED = 'completed',
}
