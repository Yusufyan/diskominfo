import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
  soalA5Controller,
  soalA6Controller,
  soalA7Controller,
  soalA8Controller,
  updateUserController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getAllUserController);
userRouter.get("/user", authMiddleware, getUserController);
userRouter.post("/", createUserController);
userRouter.patch("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

//Soal A
userRouter.get("/a5", soalA5Controller)
userRouter.get("/a6", soalA6Controller)
userRouter.get("/a7", soalA7Controller)
userRouter.get("/a8", soalA8Controller)

export default userRouter;
