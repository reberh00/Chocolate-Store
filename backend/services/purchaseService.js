import Purchase from "../models/Purchase.js";

async function getAllPurchases() {
  const purchases = await Purchase.find({});
  return purchases;
}

async function getPurchasesById(purchaseId) {
  const purchase = await Purchase.find({ _id: purchaseId });
  return purchase;
}

async function createPurchase(buyerId, chocolateId, date, amount) {
  const newPurchase = new Purchase(buyerId, chocolateId, date, amount);
  await Purchase.save();
  return newPurchase;
}

async function updatePurchaseById(
  buyerId,
  chocolateId,
  date,
  amount,
  purchaseId
) {
  const updatedPurchaseById = await Purchase.findOneAndUpdate(
    { _id: purchaseId },
    {
      buyerId,
      chocolateId,
      date,
      amount,
    },
    { new: true }
  );
  return updatedPurchaseById;
}

async function deletePurchaseById(purchaseId) {
  const deleteCount = await Purchase.deleteOne({ _id: purchaseId });
  return deleteCount;
}

async function findPurchaseByBuyerId(buyerId) {
  const purchases = await Purchase.find({ buyerId: buyerId });
  return purchases;
}

async function findPurchaseByChocolateId(chocolateId) {
  const purchases = await Purchase.find({ chocolateId: chocolateId });
  return purchases;
}

export default {
  getAllPurchases,
  getPurchasesById,
  createPurchase,
  updatePurchaseById,
  deletePurchaseById,
  findPurchaseByBuyerId,
  findPurchaseByChocolateId,
};
