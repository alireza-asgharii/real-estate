import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import MyAdsPage from "@/components/templates/MyAdsPage";

const MyAds = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  const [user] = await User.aggregate([
    { $match: { email: session.user.email } },
    {
      $lookup: {
        from: "ads",
        foreignField: "userId",
        localField: "_id",
        as: "ads",
      },
    },
  ]);
  return <MyAdsPage ads={user.ads} />;
};

export default MyAds;
