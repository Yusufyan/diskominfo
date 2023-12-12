import express from "express";
import {
  assignCourseController,
  createCourseController,
  deleteCourseController,
  getCourseController,
  updateCourseController,
} from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const courseRouter = express.Router();

courseRouter.get("/", getCourseController);
courseRouter.post("/", createCourseController);
courseRouter.patch("/:id", updateCourseController);
courseRouter.delete("/:id", deleteCourseController);

courseRouter.post("/assign", authMiddleware, assignCourseController)

export default courseRouter