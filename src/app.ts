import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "./configs/environment.config";
import { createConnection } from "typeorm";
import { configDb } from "./configs/database.config";
import { logging } from "./utils/logging.util";
import { UserCourseSeeder } from "./seeders/user-course.seeder";
import userRouter from "./routes/user.route";
import { ResponseHandler } from "./middlewares/response.middleware";
import authRouter from "./routes/auth.route";
import courseRouter from "./routes/course.route";

const app: Application = express();
const port: number = Number(env.APP_PORT);

app.use(bodyParser.json());
app.use(cors());
app.use(ResponseHandler)
//Check health
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Healthy buddy" });
});

createConnection(configDb)
  .then(async () => {
    logging.info(`Database connection established`);
    app.listen(port, () => {
      logging.info(`Server running on http://${env.APP_HOST}:${port}`);
    });
    // await UserCourseSeeder();
  })
  .catch((e) => {
    logging.error(`Unable to connect to database ${e}`);
    process.exit;
  });

//User Route
app.use("/user", userRouter)
//Auth Route
app.use("/auth", authRouter)
//Course Router
app.use('/course', courseRouter);