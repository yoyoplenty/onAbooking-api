import { Injectable } from '@nestjs/common';

import { User } from '@on/app/user/model/user/user.model';
import { sendBrevoMail } from '@on/services/email';

import { sharedEmailTemplate } from './templates/shared.template';

@Injectable()
export class EmailService {
  public async sendVerificationMessage(user: User, token: string, message?: string): Promise<any> {
    const { email } = user;

    const content = !message ? `Your confirmation code is ${token}` : message;
    const subject = 'Registration Confirmation';

    const value = sharedEmailTemplate({ subject, content, name: email });

    const res = await sendBrevoMail(email, subject, value);

    return res;
  }
}
