import { Router } from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/noteController";

export const noteRouter: Router = Router();

noteRouter
  .route("/")
  .get(getAllNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);
