import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      subject: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Order = mongoose.model('Order', orderSchema);
