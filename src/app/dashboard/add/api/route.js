import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import connectDB from "@/utils/connectDB";
import Ad from "@/models/Ad";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      title,
      description,
      location,
      phone,
      price,
      realState,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    //check session
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session)
      return NextResponse.json(
        { error: "وارد حساب کاربری خود شوید" },
        { status: 401 }
      );

    //validate field
    console.log(body);
    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json({ error: "اطلاعات نامعتبر" }, { status: 422 });
    }

    //check user account
    const user = await User.findOne({ email: session.user.email });
    console.log(user);
    if (!user)
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 401 }
      );

    //create ad
    const ad = await Ad.create({ ...body, price: +price, userId: user._id });
    console.log(ad);

    return NextResponse.json("test");
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داد" },
      { status: 500 }
    );
  }
}
