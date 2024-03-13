import { IUser } from '@on/app/user/types/user.interface';

export type IRegister = Pick<
  IUser,
  'firstName' | 'lastName' | 'middleName' | 'userName' | 'email' | 'password' | 'role' | 'phoneNumber'
>;

export type ILogin = Pick<IRegister, 'email' | 'password'>;
