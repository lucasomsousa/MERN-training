import { User, UserRole } from "../models/User";
import { ObjectId } from "typeorm";
import { ObjectId as mongoObjectId } from "mongodb";

import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getMongoRepository(User);

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.find({
    select: ["id", "username", "isActive", "roles"],
  });
};

export const getUserById = async (id: ObjectId): Promise<User | null> => {
  return await userRepository.findOneBy({ _id: new mongoObjectId(id) });
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return await userRepository.findOneBy({ username });
};

export const createUser = async (
  username: string,
  password: string,
  roles: UserRole[]
): Promise<User> => {
  const newUser = userRepository.create({
    username,
    password,
    roles,
  });
  return await userRepository.save(newUser);
};

export const updateUser = async (user: User): Promise<User | null> => {
  return await userRepository.save(user);
};

export const deleteUser = async (user: User): Promise<User | null> => {
  return await userRepository.remove(user);
};
