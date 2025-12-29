import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

/* ================= SIGNUP ================= */
export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body; // role optional

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashed,
    role: role || "user",
  });

  await user.save();

  console.log("✅ User registered");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.status(201).json({
    user: {
      id: user._id,
      name,
      email,
      role: user.role,
    },
    token,
  });
};

/* ================= LOGIN ================= */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  /* 🔥 HARDCODED ADMIN (DEV / TEST ONLY) */
  if (
    process.env.NODE_ENV !== "production" &&
    email === process.env.TEST_ADMIN_EMAIL &&
    password === process.env.TEST_ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { id: "test-admin-id", role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("🔥 Hardcoded admin logged in");

    return res.status(200).json({
      user: {
        id: "test-admin-id",
        name: "Test Admin",
        email,
        role: "admin",
      },
      token,
    });
  }

  /* 👇 NORMAL USER LOGIN */
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  console.log("✅ User logged in");

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};
