import { Injectable } from '@nestjs/common';

import { User } from '@on/app/user/model/user.model';

import { sendMessage } from './termii/api';
import { MessageResponse } from './termii/interface';

@Injectable()
export class smsService {
  public async sendVerificationMessage(user: User, token: string, message?: string): Promise<MessageResponse> {
    const { countryCode, phoneNumber } = user;

    const sms = !message ? `Your confirmation code is ${token}` : message;

    const to = `+${countryCode}${phoneNumber}`;

    const res = await sendMessage(to, sms);

    return res;
  }
}
