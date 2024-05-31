"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Ad from "@/models/Ad";
import { getUserdetails } from "@/utils/cachedData";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function rejectAd(id) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  try {
    await connectDB();
    const user = await getUserdetails();
    if (user.role !== "ADMIN")
      return { error: "شما دسترسی به این کار را ندارید" };

    const ad = await Ad.findById(id);
    if (!ad) return { error: "آگهی یافت نشد" };

    ad.published = false;
    ad.status = "rejected";
    await ad.save();

    return {
      message: "آگهی رد شد",
    };
  } catch (error) {
    console.log(error.message);
    return {
      error: "مشکلی در سرور رخ داد",
    };
  }
}

export async function acceptAd(id) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  try {
    await connectDB();
    const user = await getUserdetails();
    if (user.role !== "ADMIN")
      return { error: "شما دسترسی به این کار را ندارید" };

    const ad = await Ad.findById(id);
    if (!ad) return { error: "آگهی یافت نشد" };

    ad.published = true;
    ad.status = "verified";
    await ad.save();

    return {
      message: "آگهی منتشر شد",
    };
  } catch (error) {
    console.log(error.message);
    return {
      error: "مشکلی در سرور رخ داد",
    };
  }
}
