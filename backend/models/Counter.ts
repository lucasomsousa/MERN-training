import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Counter {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ default: 0 })
  seq: number;

  constructor(id: ObjectId, seq: number) {
    this.id = id;
    this.seq = seq;
  }
}
