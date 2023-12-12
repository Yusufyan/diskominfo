import express from "express";
import { createUserController, deleteUserController, getAllUserController, updateUserController } from "../controllers/user.controller";


const userRouter = express.Router();

userRouter.get('/', getAllUserController);
userRouter.post('/', createUserController);
userRouter.patch('/:id', updateUserController);
userRouter.delete('/', deleteUserController);

export default userRouter