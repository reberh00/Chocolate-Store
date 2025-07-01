import axios from "axios";

async function getAllUsers(token) {
  const res = await axios.get("http://localhost:5555/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default {
  getAllUsers,
};
