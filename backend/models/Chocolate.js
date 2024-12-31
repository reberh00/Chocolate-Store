import mongoose from "mongoose";
const { Schema } = mongoose;

const ChocolateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firmName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfProduction: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  netWeight: {
    type: Number,
    required: true,
  },
  cacaoPercentage: {
    type: Number,
    required: true,
  },
  isVegan: {
    type: Boolean,
    required: true,
  },
  isOrganic: {
    type: Boolean,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const Chocolate = mongoose.model("Chocolate", ChocolateSchema);

export default Chocolate;
