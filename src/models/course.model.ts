import { ICourses } from "src/entities/courses.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("courses")
export class Courses implements ICourses{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({length: 50,})
  course?: string;

  @Column({length: 50,})
  mentor?: string;

  @Column({length: 50,})
  title?: string;
}