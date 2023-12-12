// import { UserCourse } from "../models/userCourse.model";
import { Courses } from "../models/course.model";
import { Users } from "../models/user.model";
import { getConnection } from "typeorm";

export const UserCourseSeeder = async () => {
  const connection = getConnection();

  const userEntityMetaData = await connection.getMetadata(Users);
  const courseEntityMetaData = await connection.getMetadata(Courses);
  // const userCourseEntityMetaData = await connection.getMetadata(UserCourse)

  const userRepository = await connection.getRepository(Users);
  const courseRepository = await connection.getRepository(Courses);
  // const userCourseRepository = await connection.getRepository(UserCourse);

  await userRepository.delete({});
  await courseRepository.delete({});
  // await userCourseRepository.delete({});

  const userTable = await userEntityMetaData.tableName;
  const courseTable = await courseEntityMetaData.tableName;
  // const userCourseTable = await userCourseEntityMetaData.tableName

  await connection.query(
    `TRUNCATE TABLE ${userTable} RESTART IDENTITY CASCADE`
  );

  await connection.query(
    `TRUNCATE TABLE ${courseTable} RESTART IDENTITY CASCADE`
  );

  // await connection.query(
  //   `TRUNCATE TABLE ${userCourseTable} RESTART IDENTITY CASCADE`
  // );

  const dataUsers = [
    { username: "Andi", email: "andi@andi.com", password: "12345" },
    { username: "Budi", email: "budi@budi.com", password: "67890" },
    { username: "Caca", email: "caca@caca.com", password: "abcde" },
    { username: "Deni", email: "deni@deni.com", password: "fghij" },
    { username: "Euis", email: "euis@euis.com", password: "klmno" },
    { username: "Fafa", email: "fafa@fafa.com", password: "pqrst" },
  ];

  const dataCourse = [
    {course: "C++", mentor: "Ari", title: "Dr."},
    {course: "C#", mentor: "Ari", title: "Dr."},
    {course: "C#", mentor: "Ari", title: "Dr."},
    {course: "CSS", mentor: "Cania", title: "S.Kom"},
    {course: "HTML", mentor: "Cania", title: "S.Kom"},
    {course: "Javascript", mentor: "Cania", title: "S.Kom"},
    {course: "Python", mentor: "Barry", title: "S.T"},
    {course: "Micropython", mentor: "Barry", title: "S.T"},
    {course: "Java", mentor: "Darren", title: "M.T"},
    {course: "Ruby", mentor: "Darren", title: "M.T"},
  ]

  const dataUserCourse = [
    {id_user: 1, id_course: 1},
    {id_user: 1, id_course: 2},
    {id_user: 1, id_course: 3},
    {id_user: 2, id_course: 4},
    {id_user: 2, id_course: 5},
    {id_user: 2, id_course: 6},
    {id_user: 3, id_course: 7},
    {id_user: 3, id_course: 8},
    {id_user: 3, id_course: 9},
    {id_user: 4, id_course: 1},
    {id_user: 4, id_course: 2},
    {id_user: 4, id_course: 3},
    {id_user: 5, id_course: 4},
    {id_user: 5, id_course: 5},
    {id_user: 5, id_course: 6},
    {id_user: 6, id_course: 7},
    {id_user: 6, id_course: 8},
    {id_user: 6, id_course: 9},
  ]

  let userData = [];
  let courseData = [];
  let userCourseData = [];

  for (const userNameData of dataUsers) {
    const user = await userRepository.save(userNameData)

    userData.push(user);
  }

  for(const courseNameData of dataCourse){
    const course = await courseRepository.save(courseNameData);

    courseData.push(course)
  }

  // for(const userCourses of dataUserCourse){
  //   const userCourse = await userCourseRepository.save(userCourses);

  //   userCourseData.push(userCourse);
  // }


};
