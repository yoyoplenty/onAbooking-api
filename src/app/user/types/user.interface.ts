import { ROLE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IUser extends IBaseType {
  firstName: string;
  lastName: string;
  userName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: ROLE;
}
