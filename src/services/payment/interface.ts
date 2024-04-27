export interface IPayment {
  email: string;
  amount: number;
  reference: string;
  callback_url: string;
  metaData: Record<string, any>;
}
