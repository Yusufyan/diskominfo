import { Users } from "../models/user.model";
import { UserCreateDTO, UserUpdateDTO } from "../dtos/data.dto";
import { getManager } from "typeorm";
import ApiError from "../configs/api-error.config";

export async function createUser(body: UserCreateDTO): Promise<any> {
  const entityManager = getManager();
  const createUser = await entityManager.save(Users, {
    username: body.username,
    email: body.email,
    password: body.password,
  });

  return createUser;
}

export async function getAllUser() {
  const entityManager = getManager();
  const getUser = await entityManager.find(Users);

  return getUser;
}

export async function getUserByID(id: any) {
  const entityManager = getManager();
  const getUser = await entityManager.findOne(Users, {
    where: { id: id },
  });

  return getUser;
}

export async function updateUser(body: UserUpdateDTO, id: any): Promise<any> {
  const entityManager = getManager();
  const getUserById = await getUserByID(id);

  if (!getUserById) throw new ApiError(404, "User Not Found");

  const updateUser = await entityManager.update(
    Users,
    { id: id },
    { username: body.username, email: body.email }
  );

  return updateUser;
}

export async function deleteUser(id: number): Promise<any> {
  const entityManager = getManager();
  const getUserById = await getUserByID(id);

  if (!getUserById) return "User Not Found";

  const deleteUser = await entityManager.delete(Users, { id: id });

  return deleteUser;
}

export async function soalA5(): Promise<any> {
  const entityManager = getManager();
  const getData = await entityManager.query(`
    SELECT
    u.id,
    u.username,
    c.course,
    c.mentor,
    c.title
FROM
    users u
    JOIN userCourse uc ON u.id = uc.id_user
    JOIN courses c ON c.id = uc.id_course
WHERE c.title LIKE 'S.%';
    `);
  console.log(getData);
  return getData;
}

export async function soalA6(): Promise<any> {
  const entityManager = getManager();
  const getData = await entityManager.query(`
  SELECT
  u.id,
  u.username,
  c.course,
  c.mentor,
  c.title
FROM
  users u
  JOIN userCourse uc ON u.id = uc.id_user
  JOIN courses c ON c.id = uc.id_course
WHERE c.title NOT LIKE 'S%';`);
  console.log(getData);
  return getData;
}

export async function soalA7(): Promise<any> {
  const entityManager = getManager();
  const getData = await entityManager.query(`
  SELECT
    c.course,
    MIN(c.mentor) as mentor,
    MIN(c.title) as title,
    COUNT(u.id) as jumlah_peserta
FROM
    courses c
    JOIN userCourse uc ON c.id = uc.id_course
    JOIN users u ON u.id = uc.id_user
GROUP BY (c.course);`);
  console.log(getData);
  return getData;
}

export async function soalA8(): Promise<any> {
  const entityManager = getManager();
  const getData = await entityManager.query(`
  SELECT
    c.mentor,
    COUNT(u.username) as jumlah_peserta,
    COUNT(u.username) * 2000000 as totalfee
FROM
    users u
    JOIN userCourse uc ON u.id = uc.id_user
    JOIN courses c ON c.id = uc.id_course
GROUP BY(c.mentor)
ORDER BY(c.mentor) ASC`);
  console.log(getData);
  return getData;
}
