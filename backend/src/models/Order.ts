import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: "created" | "paid" | "failed";
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema: Schema<IOrderItem> = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
});

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    paymentId: { type: String },
    razorpayOrderId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
