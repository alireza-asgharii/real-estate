import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  try {
    await connectDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "-password -lastAttemptFailedNumber -lastAttemptFailed -__v"
    );
    if (!user)
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 401 }
      );

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
