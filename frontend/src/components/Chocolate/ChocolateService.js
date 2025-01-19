import axios from "axios";

async function getAllChocolates() {
  const res = await axios.get("http://localhost:5555/chocolates");
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

//omogucit route aplikacije servantes
//react router koristit za login i chocolate list

export default { getAllChocolates, getChocolateById, deleteChocolateById };
