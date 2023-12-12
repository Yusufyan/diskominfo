import { Request, Response } from "express";
import ApiError from "../configs/api-error.config";
import { CourseCreateDTO } from "../dtos/data.dto";
import {
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../services/course.service";
import { ValidationError } from "joi";

export async function createCourseController(req: Request, res: Response) {
  try {
    const body = req.body as CourseCreateDTO;
    const course = await createCourse(body);

    res.success("Course created successfully", course);
  } catch (error) {}
}

export async function updateCourseController(req: Request, res: Response) {
  try {
    const body = req.body as CourseCreateDTO;
    const param = req.params.id;
    const course = await updateCourse(param, body);

    res.success("Course updated successfully", course);
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

export async function getCourseController(req: Request, res: Response) {
  try {
    const course = await getCourse();

    res.success("Get Course Successfully", course);
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

export async function deleteCourseController(req: Request, res: Response) {
  try {
    const param = req.params.id
    const deleteData = await deleteCourse(param);

    res.success("Delete Course Successfully", deleteData);
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
