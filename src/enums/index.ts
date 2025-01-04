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

export enum TRANSACTION_TYPE {
  DEBIT = 'debit',
  CREDIT = 'credit',
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
