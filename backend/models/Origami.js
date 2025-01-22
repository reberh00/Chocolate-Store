import mongoose from "mongoose";
const { Schema } = mongoose;

const OrigamiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfFolds: {
    type: Number,
    required: true,
  },
  originYear: {
    type: Number,
    required: true,
  },
  originStory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
});

const Origami = mongoose.model("Origami", OrigamiSchema);

export default Origami;
