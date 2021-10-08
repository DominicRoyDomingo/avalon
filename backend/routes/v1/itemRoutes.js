import express from "express";
import { getItems, getItemById } from "../../controllers/itemController.js";

const ROUTER = express.Router();

ROUTER.route("/").get(getItems);
ROUTER.route("/:id").get(getItemById);

export default ROUTER;
