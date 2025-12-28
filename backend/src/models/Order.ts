import { Schema, model, Document } from 'mongoose';

export interface IOrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
  size: number;
  color: string;
}

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed';
  paymentId?: string;  // From Razorpay
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    color: { type: String, required: true },
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentId: { type: String },
}, { timestamps: true });

export default model<IOrder>('Order', orderSchema);