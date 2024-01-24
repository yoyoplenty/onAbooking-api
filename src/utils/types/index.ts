export interface ServiceResponse<T extends object | object[] | null = any> {
  data: T;
  message: string;
}

export interface ResponseDTO {
  success: boolean;
  data: null | object;
  message: string;
}
