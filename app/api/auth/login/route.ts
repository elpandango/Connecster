import {connectToDB} from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {UserModel} from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectToDB();
  const {email, password} = await req.json();
  const user = await UserModel.findOne({email});
  const cookieAge = 60 * 60 * 24 * 7;

  if (!user) {
    return NextResponse.json({error: "A user with this email could not be found."}, {status: 404});
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return NextResponse.json({error: "Wrong password!"}, {status: 401});
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    'somesupersecretsecret',
    {expiresIn: '1y'}
  );

  const response = NextResponse.json({
    message: "Login successful",
    userId: user._id.toString(),
  });

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: cookieAge,
    path: '/',
  });

  return response;
}
