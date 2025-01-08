import { BadRequestException } from '@nestjs/common';
import * as EmailValidator from 'email-validator';

export function getRandomNumber(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

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

export const isAdmin = (user) => {
  if (user.role === 'admin' || user.role === 'super-admin') return true;
  else return false;
};
