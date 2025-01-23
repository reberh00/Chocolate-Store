import Origami from "../models/Origami.js";

async function getAllOrigamis() {
  const origamis = await Origami.find({}).populate("artist");
  return origamis;
}

async function getOrigamiById(origamiId) {
  const origami = await Origami.findOne({ _id: origamiId }).populate("artist");
  return origami;
}

async function createOrigami(
  name,
  price,
  numberOfFolds,
  originYear,
  originStory,
  description,
  imageUrl,
  artist,
) {
  const newOrigami = new Origami({
    name,
    price,
    numberOfFolds,
    originYear,
    originStory,
    description,
    imageUrl,
    artist,
  });

  await newOrigami.save();
  return newOrigami;
}

async function updateOrigamiById(
  origamiId,
  name,
  price,
  numberOfFolds,
  originYear,
  originStory,
  description,
  imageUrl,
  artist,
) {
  const updatedOrigami = await Origami.findOneAndUpdate(
    { _id: origamiId },
    {
      name,
      price,
      numberOfFolds,
      originYear,
      originStory,
      description,
      imageUrl,
      artist,
    },
    { new: true },
  );
  return updatedOrigami;
}

async function deleteOrigamiById(origamiId) {
  const deletedCount = await Origami.deleteOne({ _id: origamiId });
  return deletedCount;
}

async function findOrigamiByArtistId(artistId) {
  const origamis = await Origami.find({ artist: artistId });
  return origamis;
}

export default {
  getAllOrigamis,
  getOrigamiById,
  createOrigami,
  updateOrigamiById,
  deleteOrigamiById,
  findOrigamiByArtistId,
};
