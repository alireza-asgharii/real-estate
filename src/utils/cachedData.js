import User from "@/models/User";
import connectDB from "./connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cache } from "react";
import { getServerSession } from "next-auth";

export const getUserdetails = cache(async () => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({
      email: session?.user?.email,
    });
    return user;
  } catch (error) {
    return {
      error: 'مشکلی در سرور رخ داد'
    }
  }
});
