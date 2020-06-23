const dealRouter = require("express").Router();

const Deal = require("../models/deals");
const { async } = require("rsvp");
const { response } = require("express");

dealRouter.post("/", async (request, response) => {
  const body = request.body;
  const newDeal = new Deal({
    dealType: body.type,
    dealText: body.reason,
    dealAmount: body.amount,
    date: new Date(),
  });
  const savedTransaction = await newDeal.save();
  response.json(savedTransaction.toJSON());
});

dealRouter.get("/:id", async (request, response) => {
  const deal = await Deal.findById(request.params.id);
  if (deal) {
    response.json(deal.toJSON());
  } else {
    response.status(404).end();
  }
});

dealRouter.get("/", async (request, response) => {
  const allDeals = await Deal.find({});
  response.json(allDeals.map((deal) => deal.toJSON()));
});

dealRouter.delete("/:id", async (request, response) => {
  const dealToDelete = request.params.id;
  await Deal.findByIdAndRemove(dealToDelete);
  response.status(204).end();
});
module.exports = dealRouter;
