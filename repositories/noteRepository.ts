import { Note } from "../models/Note";
import { ObjectId } from "typeorm";

import { AppDataSource } from "../data-source";

const noteRepository = AppDataSource.getMongoRepository(Note);

export const getUserNote = async (userId: ObjectId): Promise<Note | null> => {
  return await noteRepository.findOne({ where: { "user.id": userId } });
};
