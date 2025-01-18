import mongoose from "mongoose";
const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
  firmName: {
    type: String,
    required: true,
  },
  firmAddress: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateEstablished: {
    type: Date,
    required: true,
  },
  netWorth: {
    type: Number,
    required: true,
  },
  countriesOfInterest: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);

export default Manufacturer;
