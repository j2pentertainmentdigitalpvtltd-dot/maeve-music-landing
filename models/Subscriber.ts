import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Duplicate emails ko database level par rokega
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Agar model pehle se bana hai toh use karo, warna naya banao (Next.js hot reload issue fix)
const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;