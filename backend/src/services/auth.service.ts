import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
  LoginInput,
  SignupInput,
} from "../validators/auth.validator.js";
import { generateToken } from "../utils/auth.js";

export interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const signup = async (
  input: SignupInput
): Promise<AuthResult> => {
  const existingUser = await User.findOne({
    email: input.email,
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const login = async (
  input: LoginInput
): Promise<AuthResult> => {
  const user = await User.findOne({
    email: input.email,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const getCurrentUser = async (
  userId: string
): Promise<AuthResult["user"] | null> => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};