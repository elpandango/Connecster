import {connectToDB} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import {UserModel} from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectToDB();

  const { email, password, name, lastName } = await req.json();

  if (!email || !password || !name || !lastName) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    name,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "User registered successfully" });
}
