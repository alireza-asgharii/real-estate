"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Ad from "@/models/Ad";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editAd = async (data) => {
  console.log();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  try {
    await connectDB();

    const {
      userId,
      _id,
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
    } = data;

    if (
      !userId ||
      !_id ||
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constructionDate ||
      !category
    )
      return {
        error: "اطلاعات معتبر وارد کنید",
      };

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return {
        error: "حساب کاربری یافت نشد",
      };
    }

    const ad = await Ad.findById(_id);
    console.log(ad);
    if (!user._id.equals(ad.userId))
      return {
        error: "دسترسی شما به این آگهی محدود شده است",
      };

    ad.title = title;
    ad.description = description;
    ad.location = location;
    ad.phone = phone;
    ad.price = price;
    ad.realState = realState;
    ad.constructionDate = constructionDate;
    ad.category = category;
    ad.rules = rules;
    ad.amenities = amenities;
    await ad.save();
    revalidatePath("/dashboard/my-ads");
    return {
      message: "آگهی با موفقیت بروز شد",
    };
  } catch (error) {
    console.log(error.message);
    return {
      error: "مشکلی در سرور رخ داد",
    };
  }
};

export const deleteAd = async (adId) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  try {
    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return {
        error: "حساب کاربری یافت نشد",
      };
    }

    const ad = await Ad.findById(adId);
    if (!user._id.equals(ad.userId))
      return {
        error: "دسترسی شما به این آگهی محدود شده است",
      };
    await Ad.deleteOne({ _id: adId });
    revalidatePath("/dashboard/my-ads");
    return {
      message: "آگهی با موفقیت حذف شد",
    };
  } catch (error) {
    console.log(error.message);
    return {
      error: "مشکلی در سرور رخ داد",
    };
  }
};
