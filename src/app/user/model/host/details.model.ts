import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class TimeDetails {
  @ApiProperty({ example: '14:00', description: 'Check-in time' })
  @Prop({ required: true })
  checkIn: string;

  @ApiProperty({ example: '10:00', description: 'Check-out time' })
  @Prop({ required: true })
  checkOut: string;

  @ApiProperty({ example: 30, description: 'Grace period in minutes', required: false })
  @Prop()
  gracePeriod?: number;
}

export const TimeDetailsSchema = SchemaFactory.createForClass(TimeDetails);

@Schema({ _id: false })
export class HostRules {
  @ApiProperty({ example: 5, description: 'Maximum number of guests allowed' })
  @Prop({ required: true })
  maxGuests: number;

  @ApiProperty({ example: true, description: 'Are pets allowed?' })
  @Prop({ required: true })
  allowedPets: boolean;

  @ApiProperty({ example: false, description: 'Is smoking allowed?' })
  @Prop({ required: true })
  smokingAllowed: boolean;

  @ApiProperty({ example: ['No loud music after 10 PM'], description: 'Custom rules for guests' })
  @Prop({ type: [String], required: true })
  rules: string[];

  @ApiProperty({ type: TimeDetailsSchema, description: 'Check-in and check-out times' })
  @Prop({ type: TimeDetailsSchema, required: true })
  time: TimeDetails;
}

export const HostRulesSchema = SchemaFactory.createForClass(HostRules);

@Schema({ _id: false })
export class KycDetails {
  @ApiProperty({ example: 'Passport', description: 'Type of KYC document' })
  @Prop({ required: true })
  type: string;

  @ApiProperty({ example: '12345678', description: 'KYC document number' })
  @Prop({ required: true })
  number: string;

  @ApiProperty({ example: '2023-01-01', description: 'Date the KYC document was issued', type: Date })
  @Prop({ required: true })
  issuedDate: Date;

  @ApiProperty({ example: '2033-01-01', description: 'Expiry date of the KYC document', type: Date })
  @Prop({ required: true })
  expiryDate: Date;

  @ApiProperty({ example: 'https://example.com/doc.jpg', description: 'URL to the KYC document' })
  @Prop({ required: true })
  url: string;
}

export const KycDetailsSchema = SchemaFactory.createForClass(KycDetails);

@Schema({ _id: false })
export class Verification {
  @ApiProperty({ example: true, description: 'Whether the host is verified' })
  @Prop({ required: true })
  isVerified: boolean;

  @ApiProperty({ type: KycDetails, description: 'KYC details of the host' })
  @Prop({ type: KycDetails, required: true })
  kycDetails: KycDetails;

  @ApiProperty({ example: '2024-01-01', description: 'Date of verification', type: Date })
  @Prop()
  verifiedAt?: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

@Schema({ _id: false })
export class Wallet {
  @ApiProperty({ example: 5000, description: 'Current wallet balance' })
  @Prop({ required: true, type: Number, default: 0 })
  balance: number;

  @ApiProperty({ example: '1234', description: 'Wallet PIN' })
  @Prop({ required: true })
  pin: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
