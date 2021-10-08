import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

const getItems = asyncHandler(async (request, response) => {
  const items = await Item.find({});

  response.json(items);
});

const getItemById = asyncHandler(async (request, response) => {
  const ITEM = await Item.findById(request.params.id);

  if (ITEM) {
    response.json(ITEM);
  } else {
    response.status(404);
    throw new Error("Product not found.");
  }
});

export { getItems, getItemById };
