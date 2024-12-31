import mongoose from "mongoose";
const { Schema } = mongoose;

const PurchaseSchema = new Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
  chocolateId: { type: mongoose.Schema.Types.ObjectId, ref: "Chocolate" },
  date: Date,
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
