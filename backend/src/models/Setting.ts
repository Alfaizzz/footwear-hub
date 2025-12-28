import { Schema, model, Document } from 'mongoose';

export interface ISetting extends Document {
  saleActive: boolean;
  globalDiscount: number;
  faq: string;
  returnPolicy: string;
  sizeGuide: string;
  footer: string;
}

const settingSchema = new Schema<ISetting>({
  saleActive: { type: Boolean, default: false },
  globalDiscount: { type: Number, default: 0 },
  faq: { type: String, default: '' },
  returnPolicy: { type: String, default: '' },
  sizeGuide: { type: String, default: '' },
  footer: { type: String, default: '' },
});

export default model<ISetting>('Setting', settingSchema);