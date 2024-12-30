import mongoose from "mongoose";
const { Schema } = mongoose;

const BuyerSchema = new Schema({
  firmName: String,
  firmAddress: String,
  description: String,
  dateEstablished: Date,
  netWorth: Number,
  countriesOfInterest: [String],
});

const Buyer = mongoose.model("Buyer", BuyerSchema);

export default Buyer;
