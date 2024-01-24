import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  app: {
    baseUrl: process.env.BASE_URL,
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
  cloudinary: {},
};
