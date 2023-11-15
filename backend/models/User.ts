import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export type UserRole = "Employee" | "Manager" | "Admin";
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({ default: ["Employee"] })
  roles!: UserRole[];

  @Column({ default: true })
  isActive!: boolean;
}
