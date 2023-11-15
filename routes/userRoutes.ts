import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";

export const userRouter: Router = Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);
