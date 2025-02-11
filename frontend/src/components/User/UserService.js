import axios from "axios";

async function getAllUsers() {
  const res = await axios.get("http://localhost:5111/users");
  return res.data;
}

async function updateUserById(userId, userData, token) {
  const res = await axios.put(
    `http://localhost:5111/users/${userId}`,
    userData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function getUserById(userId) {
  const res = await axios.get(`http://localhost:5111/users/${userId}`);
  return res.data;
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
};
