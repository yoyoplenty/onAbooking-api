import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { QueryUserDto } from './dto/query.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly user: UserRepository) {}

  async find(filter: QueryUserDto): Promise<ServiceResponse> {
    const data = await this.user.find(filter);

    return { data, message: `users successfully fetched` };
  }

  async update(filter: any): Promise<ServiceResponse> {
    // registerPayload.password = await hashResource(registerPayload.password);

    // const { subject, content, name } = this.generateEmailContent(data);
    // const value = sharedEmailTemplate({ subject, content, name });

    // const recipient: EmailRecipient = { email: data.email, name: data.firstName };
    // await sendEmail({ recipient, value, subject });

    const data = await this.user.find(filter);

    return { data, message: `users successfully fetched` };
  }

  // private generateEmailContent(user: { lastName: string; email: string }) {
  //   const subject = `Welcome to OnABooking, ${user.lastName}!<br/>`;

  //   const content = `
  //   Welcome to OnABooking! We are delighted to have you with us.<br/>

  //   At OnABooking, we strive to provide you with the best booking experience for properties around the world. Whether you're planning a vacation or a business trip, we've got you covered.<br/><br/>

  //   If you have any questions or need assistance, please do not hesitate to contact us.<br/><br/>
  // `;

  //   return { subject, content, name: user.lastName };
  // }
}
