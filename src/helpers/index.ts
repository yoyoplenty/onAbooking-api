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

export function parseJSONStringValues(data: Record<string, any>): Record<string, any> {
  const isJSON = (str: string): boolean => {
    try {
      const parsed = JSON.parse(str);

      return (typeof parsed === 'object' && parsed !== null) || Array.isArray(parsed);
    } catch {
      return false;
    }
  };

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && isJSON(value)) {
      result[key] = JSON.parse(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const transformStringToObject = ({ value }) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
};
