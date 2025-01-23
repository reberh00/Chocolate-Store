import axios from "axios";

async function getAllArtists() {
  const res = await axios.get("http://localhost:5111/artists");
  console.log(res.data);
  return res.data;
}

async function createArtist(artistData, token) {
  const res = await axios.post(`http://localhost:5111/artists`, artistData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function updateArtistById(artistId, artistData, token) {
  const res = await axios.put(
    `http://localhost:5111/artists/${artistId}`,
    artistData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function getArtistById(artistId) {
  const res = await axios.get(`http://localhost:5111/artists/${artistId}`);
  return res.data;
}

async function deleteArtistById(artistId, token) {
  const res = await axios.delete(`http://localhost:5111/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default {
  getAllArtists,
  getArtistById,
  deleteArtistById,
  createArtist,
  updateArtistById,
};
