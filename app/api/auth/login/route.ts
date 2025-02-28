import {connectToDB} from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {UserModel} from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectToDB();
  const {email, password} = await req.json();

  const user = await UserModel.findOne({email});
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

  return NextResponse.json(
    {
      token,
      userId: user._id.toString(),
    }
  );
}
