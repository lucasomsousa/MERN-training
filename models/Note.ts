import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
  @ObjectIdColumn()
  id: ObjectId;

  @Column(() => User)
  user: User;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  constructor(
    id: ObjectId,
    user: User,
    title: string,
    text: string,
    completed: boolean,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.text = text;
    this.completed = completed;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
