import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  app: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:5500/',
  },
  email: {
    defaultFrom: process.env.EMAIL_DEFAULT_FROM,
  },
  db: {
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE_IN,
    saltOrRounds: Number(process.env.JWT_SECRET),
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  cloudinary: {
    appKey: process.env.CLOUDINARY_ACCOUNT_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiSecret: process.env.CLOUDINARY_SECRET_KEY,
  },
  termii: {
    apiKey: process.env.TERMII_API_KEY,
    secretKey: process.env.TERMII_SECRET_KEY,
    senderId: process.env.TERMII_SENDER_ID || 'N-Alert',
  },
  paystack: {
    baseUrl: process.env.PAYSTACK_BASE_URL,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
    secretKey: process.env.PAYSTACK_SECRET_KEY,
  },
  sendChamp: {
    sender: process.env.SENDCHAMP_SENDER,
    baseUrl: process.env.SENDCHAMP_BASE_URL,
    apiKey: process.env.SENDCHAMP_API_KEY,
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
    sendEmail: process.env.BREVO_SENDER_EMAIL || 'admin.easyflip.work',
    replyEmail: process.env.BREVO_REPLY_EMAIL || 'noreply.easyflip.work',
  },
};
