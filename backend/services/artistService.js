import Artist from "../models/Artist.js";

async function getAllArtists() {
  const artists = await Artist.find({});
  return artists;
}

async function getArtistById(artistId) {
  const artist = await Artist.findOne({ _id: artistId });
  return artist;
}

async function createArtist(
  firstName,
  lastName,
  country,
  city,
  biography,
  netWorth,
  imageUrl,
) {
  const newArtist = new Artist({
    firstName,
    lastName,
    country,
    city,
    biography,
    netWorth,
    imageUrl,
  });
  await newArtist.save();
  return newArtist;
}

async function updateArtistById(
  artistId,
  firstName,
  lastName,
  country,
  city,
  biography,
  netWorth,
  imageUrl,
) {
  const updatedArtist = await Artist.findOneAndUpdate(
    { _id: artistId },
    {
      firstName,
      lastName,
      country,
      city,
      biography,
      netWorth,
      imageUrl,
    },
    { new: true },
  );
  return updatedArtist;
}

async function deleteArtistById(artistId) {
  const deletedCount = await Artist.deleteOne({ _id: artistId });
  return deletedCount;
}

export default {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
};
