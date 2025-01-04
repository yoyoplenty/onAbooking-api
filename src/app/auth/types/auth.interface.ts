import { IUser } from '@on/app/user/types/user.interface';

export type IRegister = Pick<IUser, 'country' | 'countryCode' | 'phoneNumber'>;

export type ILogin = Partial<Pick<IUser, 'email' | 'countryCode' | 'phoneNumber'>> & Pick<IUser, 'password'>;
