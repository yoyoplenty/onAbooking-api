export interface IPayment {
  email: string;
  amount: number;
  reference: string;
  metaData: Record<string, any>;
}
