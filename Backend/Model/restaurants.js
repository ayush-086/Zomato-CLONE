import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true }
});

const restaurantItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: [String], required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  cuisine: { type: [String], required: true },
  image: { type: [String], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  menu: { type: [menuItemSchema], required: true } 
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  restaurants: [restaurantItemSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;