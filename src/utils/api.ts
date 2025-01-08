import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

export async function makePostRequest(url: string, payload: Record<any, any>, params?: Record<any, any>): Promise<any> {
  try {
    const { data } = await axios.post(url, payload, params);

    // return data;
    return data;
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Error occurred, unable to perform operation');
  }
}

export async function makeGetRequest(url: string, params?: Record<string, any>): Promise<any> {
  try {
    const { data } = await axios.get(url, params);

    return data;
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Error occurred, unable to perform operation');
  }
}
