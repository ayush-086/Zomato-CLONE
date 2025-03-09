import mongoose from "mongoose";

const QuickSearchesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', QuickSearchesSchema);

export default Item;