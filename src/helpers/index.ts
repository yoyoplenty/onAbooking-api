import { BadRequestException } from '@nestjs/common';
import * as EmailValidator from 'email-validator';

export const getRandomNumber = (minDigits = 1, maxDigits = 6): number => {
  const min = Math.pow(10, minDigits - 1);
  const max = Math.pow(10, maxDigits) - 1;

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const validateEmails = (email: string): string => {
  if (!EmailValidator.validate(email)) throw new BadRequestException('Invalid email provided');
  return email;
};

export const validateFields = (field: string): string => {
  if (!field || field === 'undefined' || field?.length < 1) {
    throw new BadRequestException('Invalid name in file');
  }
  return field;
};
