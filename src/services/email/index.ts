import axios from 'axios';

import { config } from '@on/config';

const apiKey = config.sendChamp.apiKey;
const baseUrl = config.sendChamp.baseUrl;

export interface EmailRecipient {
  email: string;
  name: string;
}

interface EmailMessageBody {
  type: string;
  value: string;
}

interface EmailRequest {
  message_body: EmailMessageBody;
  to: EmailRecipient[];
  subject: string;
}

export interface MailPayload {
  recipient: EmailRecipient;
  value: string;
  subject: string;
}

export async function sendEmail(payload: MailPayload): Promise<void> {
  const { value, recipient, subject } = payload;

  const url = `${baseUrl}email/send`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + apiKey,
  };

  const data: EmailRequest = {
    message_body: {
      type: 'html',
      value,
    },
    to: [
      {
        email: recipient.email,
        name: recipient.name,
      },
    ],
    subject,
  };

  try {
    const response = await axios.post(url, data, { headers });

    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
  }
}
