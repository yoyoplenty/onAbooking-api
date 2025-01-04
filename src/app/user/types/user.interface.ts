import { ROLE, USER_STATUS } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IUser extends IBaseType {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  dob: string;
  role: ROLE;
  profile: IProfile;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  status: USER_STATUS;
  referralCode: string;
  lastLogin: Date;
}

export interface IProfile {
  avatar: string;
  languages: string[];
}
