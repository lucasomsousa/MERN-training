import asyncHandler from "express-async-handler";

import {
  getAllUsers as getAllUsersService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/userServices";

import { Request, Response } from "express";

export const getAllUsers = asyncHandler(async (_req, res: Response) => {
  const users = await getAllUsersService();
  if (!users.length) {
    res.status(400).json({ message: "No users found" });
  }

  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !roles?.length)
    res.status(400).json({ message: "All fields are required." });

  try {
    await createUserService(username, password, roles);
    res.status(201).json({ message: `New user ${username} created` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unkown error occurred." });
    }
  }
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id, username, password, roles, isActive } = req.body;

  if (!id || !username || !roles?.length || typeof isActive !== "boolean")
    res
      .status(400)
      .json({ message: "All fields except password are required" });

  try {
    await updateUserService(id, username, roles, isActive, password);
    res.status(200).json({ message: `User ${username} updated` });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unkown error occurred." });
    }
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    await deleteUserService(id);
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
