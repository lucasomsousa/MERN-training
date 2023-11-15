import asyncHandler from "express-async-handler";

import {
  getAllNotes as getAllNotesService,
  createNote as createNoteService,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "../services/noteServices";

import { Request, Response } from "express";

export const getAllNotes = asyncHandler(async (_req, res: Response) => {
  const notes = await getAllNotesService();
  if (!notes.length) {
    res.status(400).json({ message: "No notes found" });
  }

  res.status(200).json(notes);
});

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { user, title, text } = req.body;

  if (!user || !title || !text)
    res.status(400).json({ message: "All fields are required." });

  try {
    await createNoteService(user, title, text);
    res.status(201).json({ message: `New note ${title} created` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unkown error occurred." });
    }
  }
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const { id, user, title, text, completed } = req.body;

  if (!id || !user || !title || !text || typeof completed !== "boolean")
    res.status(400).json({ message: "All fields are required" });

  try {
    await updateNoteService(id, user, title, text, completed);
    res.status(200).json({ message: `Note ${id} updated` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unkown error occurred." });
    }
  }
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    await deleteNoteService(id);
    res
      .status(200)
      .json({ message: `User with id ${id} was succesfully deleted` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unkown error occurred." });
    }
  }
});
