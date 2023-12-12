import { Request, Response } from "express";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/data.dto";
import { createUser, deleteUser, getAllUser, updateUser } from "../services/user.service";
import ApiError from "../configs/api-error.config";
import { ValidationError } from "joi";


export async function createUserController(req: Request, res: Response) {
  try {
    const body = req.body as UserCreateDTO;
    const create = await createUser(body);

    res.success("User created successfully", create)
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}

export async function getAllUserController(req: Request, res: Response) {
  try {
    const getUser = await getAllUser();

    return res.status(200).json(getUser);
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const body = req.body as UserUpdateDTO
    const param = req.params.id
    const update = await updateUser(body, param)

    return res.status(200).json({ message: "User Updated", data: update.data});
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const param = req.body.id
    const deleteData = await deleteUser(param)

    return res.status(200).json({ message: "User Deleted", data: deleteData});
  } catch (error) {
    if (error instanceof ApiError) {
      res.error(error.status, error.message);
    } else if (error instanceof ValidationError) {
      const errorMessages = error.details.map((err) => err.message);
      console.log(error);
      res.error(400, errorMessages);
    } else {
      console.log(error);
      res.error(500, "Internal Server Error");
    }
  }
}
