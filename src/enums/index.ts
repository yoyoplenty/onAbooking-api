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

export enum PROPERTY_STATUS {
  AVAILABLE = 'available',
  BOOKED = 'booked',
}

export enum TRANSACTION_STATUS {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETED = 'completed',
}
