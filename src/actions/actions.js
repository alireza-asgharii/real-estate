"use server";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export async function checkEmail(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

    if (!emailRegx.test(email)) return;

    if (user)
      return {
        message: "حساب کاربری با این ایمیل وجود دارد",
        isAvailable: false,
      };

    return {
      isAvailable: true,
    };
  } catch (error) {
    return {
      error: "مشکلی در سرور رخ داد",
    };
  }
}
