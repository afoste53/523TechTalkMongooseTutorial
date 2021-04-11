import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(registerUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
