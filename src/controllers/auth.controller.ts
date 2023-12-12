import { Request, Response } from "express";
import { ValidationError } from "joi";
import ApiError from "../configs/api-error.config";
import { LoginDTO } from "../dtos/data.dto";
import { loginService } from "../services/auth.service";

export async function loginController(req: Request, res: Response) {
  try {
    const body = req.body as LoginDTO;
    const login = await loginService(body);
    
    res.success("Login Successfully", login)
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