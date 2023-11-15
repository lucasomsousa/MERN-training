import { User, UserRole } from "../models/User";
import { ObjectId } from "typeorm";

import {
  getAllUsers as getAllUsersRepository,
  getUserById as getUserByIdRepository,
  getUserByUsername as getUserByUsernameRepository,
  createUser as createUserRepository,
  updateUser as updateUserRepository,
  deleteUser as deleteUserRepository,
} from "../repositories/userRepository";

import { getUserNote } from "../repositories/noteRepository";

import bcrypt from "bcrypt";

export const getAllUsers = async (): Promise<User[]> => {
  return await getAllUsersRepository();
};

export const createUser = async (
  username: string,
  password: string,
  roles: UserRole[]
): Promise<User> => {
  const duplicate = await getUserByUsernameRepository(username);
  if (duplicate) throw new Error(`username ${username} already exists.`);

  const hashedPwd = await bcrypt.hash(password, 10);

  return await createUserRepository(username, hashedPwd, roles);
};

export const updateUser = async (
  id: ObjectId,
  username: string,
  roles: UserRole[],
  isActive: boolean,
  password?: string
) => {
  const userToUpdate = await getUserByIdRepository(id);

  if (!userToUpdate) {
    throw new Error(`User with id ${id} not found.`);
  }
  userToUpdate.username = username;
  userToUpdate.roles = roles;
  userToUpdate.isActive = isActive;

  if (password) {
    userToUpdate.password = await bcrypt.hash(password, 10);
  }

  return await updateUserRepository(userToUpdate);
};

export const deleteUser = async (id: ObjectId): Promise<User | null> => {
  const userToDelete = await getUserByIdRepository(id);

  if (!userToDelete) {
    throw new Error(`User with id ${id} not found.`);
  }

  const note = await getUserNote(id);
  if (note) {
    throw new Error(
      `User with id ${id} has assigned notes. Please delete them or assign them to another user before continuing.`
    );
  }

  return await deleteUserRepository(userToDelete);
};
