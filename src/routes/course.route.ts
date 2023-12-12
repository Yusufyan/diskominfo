import express from "express";
import {
  createCourseController,
  deleteCourseController,
  getCourseController,
  updateCourseController,
} from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.get("/", getCourseController);
courseRouter.post("/", createCourseController);
courseRouter.patch("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

export default courseRouter