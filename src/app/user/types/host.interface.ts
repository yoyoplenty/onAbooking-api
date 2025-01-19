import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IHost extends IBaseType {
  userId: ObjectId;
  bio: string;
  wallet: IWallet;
  verification: IVerification;
  rules: IHostRules;
  batchState: string;
}

export interface IVerification {
  isVerified: boolean;
  kycDetails: IKycDetails;
  verifiedAt?: Date;
}

export interface IWallet {
  balance: number;
  pin: string;
}

export interface IKycDetails {
  type: string;
  number: string;
  issuedDate: Date;
  expiryDate: Date;
  url: string;
}

export interface IHostRules {
  maxGuests: number;
  allowedPets: boolean;
  smokingAllowed: boolean;
  rules: string[];
  time: ITimeDetails;
}

export interface ITimeDetails {
  checkIn: string;
  checkOut: string;
  gracePeriod?: number;
}
