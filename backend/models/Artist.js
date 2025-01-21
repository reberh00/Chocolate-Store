import mongoose from "mongoose";
const { Schema } = mongoose;

const ArtistSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  netWorth: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;
