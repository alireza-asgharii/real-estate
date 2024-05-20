import { NextResponse } from "next/server";
import User from "@/models/User";

import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";


export async function POST(req) {
  try {
    //connect to DB
    await connectDB();

    const { email, password } = await req.json();
    console.log({ email, password });

    //check field
    if (!email || !password) {
      return NextResponse.json(
        { error: "اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }

    //check existingUser
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "حساب کاربری با این ایمیل از قبل وجود دارد" },
        { status: 422 }
      );
    }

    //Create user
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword });
    console.log(user);

    return NextResponse.json(
      { message: "حساب کاربری با موفقیت ایجاد شد." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "اروری در سرور رخ داد" },
      { status: 500 }
    );
  }
}
