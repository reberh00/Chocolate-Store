import axios from "axios";

async function getAllManufacturers() {
  const res = await axios.get("http://localhost:5555/manufacturers");
  return res.data;
}

async function getManufacturerById(manufacturerId) {
  const res = await axios.get(
    `http://localhost:5555/manufacturers/${manufacturerId}`,
  );
  return res.data;
}

async function createManufacturer(manufacturerData, token) {
  const res = await axios.post(
    `http://localhost:5555/manufacturers`,
    manufacturerData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function updateManufacturerById(manufacturerId, manufacturerData, token) {
  const res = await axios.put(
    `http://localhost:5555/manufacturers/${manufacturerId}`,
    manufacturerData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function deleteManufacturerById(manufacturerId, token) {
  const res = await axios.delete(
    `http://localhost:5555/manufacturers/${manufacturerId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
}

export default {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById,
};
