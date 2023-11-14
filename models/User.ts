import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: ["Employee"] })
  roles: string[];

  @Column({ default: true })
  active: boolean;

  constructor(
    id: ObjectId,
    username: string,
    password: string,
    roles: string[],
    active: boolean
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.active = active;
  }
}
