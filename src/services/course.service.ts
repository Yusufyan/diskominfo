import { getManager } from "typeorm";
import { CourseCreateDTO } from "../dtos/data.dto";
import { Courses } from "../models/course.model";
import ApiError from "../configs/api-error.config";

export async function createCourse(body: CourseCreateDTO){
  const entityManager = getManager();
  const course = await entityManager.save(Courses, {
    course: body.course,
    mentor: body.mentor,
    title: body.title,
  })

  return course
}

export async function getCourse(){
  const entityManager = getManager();
  const course = await entityManager.find(Courses)

  return course
}

export async function updateCourse(id: any, body:CourseCreateDTO) {
  const entityManager = getManager();
  const getCourse = await entityManager.findOne(Courses, {
    where: {id: id}
  })
  if (!getCourse) throw new ApiError(404, "Course not Found")
  const course = entityManager.update(Courses, {id: id}, {course: body.course, mentor: body.mentor, title: body.title})

  return course
}

export async function deleteCourse(id: any){
  const entityManager = getManager();
  const getCourse = await entityManager.findOne(Courses, {
    where: {id: id}
  })

  if (!getCourse) throw new ApiError(404, "Course not Found")

  const deleteCourse = await entityManager.delete(Courses, {id: id})

  return deleteCourse
}
