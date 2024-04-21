import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { config } from '@on/config';

import { IPayment } from './interface';

@Injectable()
export class PaystackService {
  private baseUrl = config.paystack.baseUrl;
  private secretKey = config.paystack.secretKey;

  async initializePayment(payload: IPayment): Promise<any> {
    const { baseUrl, secretKey } = this;

    try {
      const { data } = await axios.post(`${baseUrl}transaction/initialize`, payload, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async verifyPayment(reference: string): Promise<any> {
    const { baseUrl, secretKey } = this;

    try {
      const { data } = await axios.post(`${baseUrl}transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
