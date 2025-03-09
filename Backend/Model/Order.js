import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userName: {type: String, required: true},
  name: { type: String, required: true },
  itemLocation: { type: String, required: true },
  orderedFood: { type: [String], required: true },
  subTotal: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;