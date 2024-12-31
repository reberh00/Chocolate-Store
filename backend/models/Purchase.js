import mongoose from "mongoose";
const { Schema } = mongoose;

const PurchaseSchema = new Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  chocolateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chocolate",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
