import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Note } from "./models/Note";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: `${process.env.DATABASE_URI}`,
  synchronize: true,
  logging: true,
  entities: [Note, User],
  subscribers: [],
  migrations: [],
});
