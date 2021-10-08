import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../../controllers/userController.js";
import { authorize } from "../../middleware/authMiddleware.js";

const ROUTER = express.Router();

ROUTER.post("/login", authUser);
ROUTER.route("/").post(registerUser);
ROUTER.route("/profile")
  .get(authorize, getUserProfile)
  .put(authorize, updateUserProfile)
  .delete(authorize, deleteUserProfile);

export default ROUTER;
