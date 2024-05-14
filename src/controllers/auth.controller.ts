import { Request, Response } from "express";
import UserCredential from "../models/user-credential.model";
import jwt from "jsonwebtoken";
import { compare, genSalt, hash } from "bcryptjs";
import { AUTH_SECRET_KEY, AUTH_EXPIRE_TIME } from "../config";
import User from "../models/user.model";

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const foundUser = await User.findOne({ email }).populate("userCredential");
    if (!foundUser) {
      return response.status(404).json({ message: "User not found!" });
    }
    const isPasswordCorrect: boolean = await comparePassword(
      password,
      foundUser.userCredential?.password ?? ""
    );
    if (!isPasswordCorrect) {
      return response.status(401).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
      AUTH_SECRET_KEY,
      {
        expiresIn: AUTH_EXPIRE_TIME,
      }
    );
    return response.status(200).json(token);
  } catch (error) {
    response.status(500).json({ message: "Unknown error occurred!" });
  }
}

export async function signup(request: Request, response: Response) {
  try {
    const { name, dateOfBirth, email, phoneNumber, userCredential } =
      request.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return response.status(400).json({ message: "Email already existed" });
    }
    const hashedPassword = await hashPassword(userCredential?.password);
    const newUser = await User.create({
      name,
      dateOfBirth,
      email,
      phoneNumber,
    });
    await UserCredential.create({
      password: hashedPassword,
      userId: newUser.id,
    });
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ message: "Unknown error occurred!" });
  }
}

async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(password, salt);
}

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}
