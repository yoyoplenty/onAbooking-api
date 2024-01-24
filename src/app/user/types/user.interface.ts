import { ROLE } from '@on/enums';
import { IBaseModel } from '@on/utils/types';

export interface IUser extends IBaseModel {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: ROLE;
}
