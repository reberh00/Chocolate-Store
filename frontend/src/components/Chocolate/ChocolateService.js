import axios from "axios";

async function getAllChocolates() {
  const res = await axios.get("http://localhost:5555/chocolates");
  return res.data;
}

async function createChocolate(chocolateData, token) {
  const res = await axios.post(
    `http://localhost:5555/chocolates`,
    chocolateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function updateChocolateById(chocolateId, chocolateData, token) {
  const res = await axios.put(
    `http://localhost:5555/chocolates/${chocolateId}`,
    chocolateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function getChocolateById(chocolateId) {
  const res = await axios.get(
    `http://localhost:5555/chocolates/${chocolateId}`,
  );
  return res.data;
}

async function deleteChocolateById(chocolateId, token) {
  const res = await axios.delete(
    `http://localhost:5555/chocolates/${chocolateId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
}

export default {
  getAllChocolates,
  getChocolateById,
  deleteChocolateById,
  createChocolate,
  updateChocolateById,
};
