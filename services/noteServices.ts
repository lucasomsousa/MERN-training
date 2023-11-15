import { User } from "../models/User";
import { Note } from "../models/Note";

import { ObjectId } from "typeorm";

import {
  getAllNotes as getAllNotesRepository,
  getNoteById as getNoteByIdRepository,
  getNoteByTitle as getNoteByTitleRepository,
  createNote as createNoteRepository,
  updateNote as updateNoteRepository,
  deleteNote as deleteNoteRepository,
} from "../repositories/noteRepository";

export const getAllNotes = async (): Promise<Note[]> => {
  return await getAllNotesRepository();
};

export const createNote = async (
  user: User,
  title: string,
  text: string
): Promise<Note> => {
  const duplicate = await getNoteByTitleRepository(title);
  if (duplicate) throw new Error(`Note ${title} already exists.`);

  return await createNoteRepository(user, title, text);
};

export const updateNote = async (
  id: ObjectId,
  user: User,
  title: string,
  text: string,
  completed: boolean
) => {
  const noteToUpdate = await getNoteByTitleRepository(title);

  if (!noteToUpdate) {
    throw new Error(`User with id ${id} not found.`);
  }

  const duplicate = await getNoteByTitleRepository(title);

  if (duplicate?.id !== id) {
    throw new Error(`The title ${title} is already in use.`);
  }

  noteToUpdate.user = user;
  noteToUpdate.title = title;
  noteToUpdate.text = text;
  noteToUpdate.completed = completed;

  return await updateNoteRepository(noteToUpdate);
};

export const deleteNote = async (id: ObjectId): Promise<Note | null> => {
  const noteToDelete = await getNoteByIdRepository(id);

  if (!noteToDelete) {
    throw new Error(`Note with id ${id} not found.`);
  }

  return await deleteNoteRepository(noteToDelete);
};
