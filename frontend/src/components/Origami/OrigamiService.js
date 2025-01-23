import axios from "axios";

async function getAllOrigamis() {
  const res = await axios.get("http://localhost:5111/origamis");
  console.log(res.data);
  return res.data;
}

async function createOrigami(origamiData, token) {
  const res = await axios.post(`http://localhost:5111/origamis`, origamiData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function updateOrigamiById(origamiId, origamiData, token) {
  const res = await axios.put(
    `http://localhost:5111/origamis/${origamiId}`,
    origamiData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function getOrigamiById(origamiId) {
  const res = await axios.get(`http://localhost:5111/origamis/${origamiId}`);
  return res.data;
}

async function deleteOrigamiById(origamiId, token) {
  const res = await axios.delete(
    `http://localhost:5111/origamis/${origamiId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
}

export default {
  getAllOrigamis,
  getOrigamiById,
  deleteOrigamiById,
  createOrigami,
  updateOrigamiById,
};
