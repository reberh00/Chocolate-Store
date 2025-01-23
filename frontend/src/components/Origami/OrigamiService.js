import axios from "axios";

async function getAllOrigamis() {
  const res = await axios.get(
    "https://fuzzy-guide-7jgwrqp57pxf44r-5111.app.github.dev/origamis",
  );
  console.log(res.data);
  return res.data;
}

async function createOrigami(origamiData, token) {
  const res = await axios.post(
    `https://fuzzy-guide-7jgwrqp57pxf44r-5111.app.github.dev/origamis`,
    origamiData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function updateOrigamiById(origamiId, origamiData, token) {
  const res = await axios.put(
    `https://fuzzy-guide-7jgwrqp57pxf44r-5111.app.github.dev/origamis/${origamiId}`,
    origamiData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
}

async function getOrigamiById(origamiId) {
  const res = await axios.get(
    `https://fuzzy-guide-7jgwrqp57pxf44r-5111.app.github.dev/origamis/${origamiId}`,
  );
  return res.data;
}

async function deleteOrigamiById(origamiId, token) {
  const res = await axios.delete(
    `https://fuzzy-guide-7jgwrqp57pxf44r-5111.app.github.dev/origamis/${origamiId}`,
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
