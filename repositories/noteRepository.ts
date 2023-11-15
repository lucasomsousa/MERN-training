import { Note } from "../models/Note";
import { User } from "../models/User";

import { ObjectId } from "typeorm";
import { ObjectId as mongoObjectId } from "mongodb";

import { AppDataSource } from "../data-source";

const noteRepository = AppDataSource.getMongoRepository(Note);

export const getUserNote = async (user: User): Promise<Note | null> => {
  return await noteRepository.findOne({ where: { "user.id": user.id } });
};

export const getAllNotes = async (): Promise<Note[]> => {
  return await noteRepository.find();
};

export const getNoteById = async (id: ObjectId): Promise<Note | null> => {
  return await noteRepository.findOneBy({ _id: new mongoObjectId(id) });
};

export const getNoteByTitle = async (title: string): Promise<Note | null> => {
  return await noteRepository.findOneBy({ title });
};

export const createNote = async (
  user: User,
  title: string,
  text: string
): Promise<Note> => {
  const newNote = noteRepository.create({
    user,
    title,
    text,
  });
  return await noteRepository.save(newNote);
};

export const updateNote = async (note: Note): Promise<Note | null> => {
  return await noteRepository.save(note);
};

export const deleteNote = async (note: Note): Promise<Note | null> => {
  return await noteRepository.remove(note);
};
