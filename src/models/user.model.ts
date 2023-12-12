import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUsers } from "../entities/users.entity";
import { Courses } from "./course.model";

@Entity("users")
export class Users implements IUsers {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, nullable: true })
  username?: string;
  
  @Column({ length: 50, nullable: true })
  email?: string;

  @Column({ length: 50, nullable: true })
  password?: string;

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  // @ManyToMany(() => Courses, { cascade: true })
  // @JoinTable({
  //   name: "userCourse",
  //   joinColumn: {
  //     name: "id_user",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "id_course",
  //     referencedColumnName: "id",
  //   },
  // })
  // userCourse: Courses[];

  @BeforeInsert()
    updatedDates(){
      this.created_at = new Date();
      this.updated_at = new Date();
    }
}
