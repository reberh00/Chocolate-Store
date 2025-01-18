import axios from "axios";

async function getAllChocolates() {
  const res = await axios.get("http://localhost:5555/chocolates");
  return res.data;
}

export default { getAllChocolates };
