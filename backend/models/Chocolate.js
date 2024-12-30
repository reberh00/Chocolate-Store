import mongoose from "mongoose";
const { Schema } = mongoose;

const ChocolateSchema = new Schema({
  name: String,
  firmName: String,
  description: String,
  dateOfProduction: Date,
  price: Number,
  netWeight: Number,
  cacaoPercentage: Number,
  isVegan: Boolean,
  isOrganic: Boolean,
  ingredients: [String],
});

const Chocolate = mongoose.model("Chocolate", ChocolateSchema);

export default Chocolate;
