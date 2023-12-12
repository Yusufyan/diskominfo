import { Users } from "../models/user.model";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/data.dto";
import { getManager } from "typeorm";
import ApiError from "../configs/api-error.config";


export async function createUser(body: UserCreateDTO): Promise<any>{
  const entityManager = getManager()
  const createUser = await entityManager.save(Users,{
    username: body.username,
    email: body.email,
    password: body.password
  })

  return createUser
}

export async function getAllUser(){
  const entityManager = getManager()
  const getUser = await entityManager.find(Users)

  return getUser
}

export async function getUserByID(id: any){
  const entityManager = getManager()
  const getUser = await entityManager.findOne(Users, {
    where: {id: id}
  })

  return getUser
}

export async function updateUser(body: UserUpdateDTO, id: any): Promise<any>{
  const entityManager = getManager()
  const getUserById = await getUserByID(id)

  if(!getUserById) throw new ApiError (404, "User Not Found")

  const updateUser = await entityManager.update(Users,{id: id}, {username: body.username, email: body.email})

  return updateUser
}

export async function deleteUser(id: number): Promise<any> {
  const entityManager = getManager()
  const getUserById = await getUserByID(id)

  if(!getUserById) return "User Not Found"

  const deleteUser = await entityManager.delete(Users,{id:id})

  return deleteUser
}