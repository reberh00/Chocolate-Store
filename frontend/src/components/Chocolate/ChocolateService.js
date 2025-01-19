import axios from "axios";

async function getAllChocolates() {
  const res = await axios.get("http://localhost:5555/chocolates");
  return res.data;
}

async function updateChocolateById(chocolateId, chocolateData) {
  const res = await axios.put(
    `http://localhost:5555/chocolates/${chocolateId}`,
    chocolateData,
    {
      headers: {
        Authorization:
          "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlJvYmkiLCJpYXQiOjE3MzcyOTQyMTksImV4cCI6MTczNzI5NzgxOX0.eBsjwmRH3DQ4vKFoRdvt7gDVdpu6Lkiwy9-Cvn3-hhE",
      },
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

export default { getAllChocolates, getChocolateById, updateChocolateById };
