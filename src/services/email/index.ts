import * as Brevo from '@getbrevo/brevo';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

import { config } from '@on/config';

const sendChampApiKey = config.sendChamp.apiKey;
const sendChampBaseUrl = config.sendChamp.baseUrl;

const brevoApiKey = config.brevo.apiKey;
const replyEmail = config.brevo.replyEmail;
const senderEmail = config.brevo.sendEmail;

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

  const url = `${sendChampBaseUrl}email/send`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sendChampApiKey,
  };

  const data: EmailRequest = {
    message_body: {
      type: 'html',
      value,
    },
    to: [{ email: recipient.email, name: recipient.name }],
    subject,
  };

  try {
    const response = await axios.post(url, data, { headers });

    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
  }
}

export async function sendBrevoMail(userEmail: string, subject: string, mailMessage: string, attachments?: any[]) {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(0, brevoApiKey);

    await apiInstance.sendTransacEmail({
      sender: {
        name: 'Easyflip',
        email: senderEmail,
      },
      to: [{ email: userEmail }],
      replyTo: { email: replyEmail },
      subject: subject,
      htmlContent: mailMessage,
      attachment: attachments && attachments.length > 0 ? attachments : null,
    });

    console.log('Brevo message was sent------------->');

    return true;
  } catch (error) {
    console.log(error);
    return new BadRequestException('Failed to send emails');
  }
}
