import ApiError from "../configs/api-error.config";
import { LoginDTO } from "../dtos/data.dto";
import { Users } from "../models/user.model";
import { getManager } from "typeorm";
import jwt from "jsonwebtoken";
import { env } from "process";

export async function loginService(body: LoginDTO) {
  const entityManager = getManager();
  const dataUser = await entityManager.findOne(Users, {
    where: [
      { username: body.usernameOrEmail },
      { email: body.usernameOrEmail },
    ],
  });
  // console.log(dataUser.password)

  if(!dataUser) throw new ApiError (400, "Bad Credentials")
  
  if (dataUser.password != body.password) throw new ApiError(401, "Bad Credential")

  const token = jwt.sign(
    { userId: dataUser.id, username: dataUser.username },
    env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return { token }
}
