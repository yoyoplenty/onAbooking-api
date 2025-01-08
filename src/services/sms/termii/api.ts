import { config } from '@on/config';
import { makePostRequest } from '@on/utils/api';

import { IMessageRequest, IOTPRequest, IOTPpin, IPinVerification, MessageResponse, OTPResponse } from './interface';

const baseUrl = 'https://api.ng.termii.com/api';

const apiKey = config.termii.apiKey;
const senderId = config.termii.senderId;

export async function sendMessage(to: string, message: string): Promise<MessageResponse> {
  const payload: IMessageRequest = {
    api_key: apiKey,
    to,
    from: senderId,
    sms: message,
    type: 'plain',
    channel: 'dnd',
  };

  const response = await makePostRequest(`${baseUrl}/sms/send`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export async function sendOTP(to: string): Promise<OTPResponse> {
  const payload: IOTPRequest = {
    api_key: apiKey,
    message_type: 'NUMERIC',
    to,
    from: senderId,
    channel: 'dnd',
    pin_attempts: 10,
    pin_time_to_live: 5,
    pin_length: 6,
    pin_placeholder: '< 1234 >',
    message_text: 'Your onA Booking confirmation code is < 1234 >. Valid for 30 minutes, one-time use only.',
    pin_type: 'NUMERIC',
  };

  const response = await makePostRequest(`${baseUrl}/sms/otp/send`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export async function verifyOTP(data: IOTPpin): Promise<any> {
  const { pin, pinId } = data;

  const payload: IPinVerification = {
    api_key: apiKey,
    pin_id: pinId,
    pin,
  };

  const response = await makePostRequest(`${baseUrl}/sms/otp/verify`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}
