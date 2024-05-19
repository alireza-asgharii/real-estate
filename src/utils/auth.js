import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashed = await hash(password, 10);
  return hashed;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
