import AdvertisementsPage from "@/components/templates/AdvertisementsPage";
import Ad from "@/models/Ad";
import connectDB from "@/utils/connectDB";

const Advertisements = async ({ searchParams }) => {
  await connectDB();
  const ads = await Ad.find({
    published: true,
    status: "verified",
  }).select("-userId");
  let finall = ads;
  if (searchParams.category) {
    finall = finall.filter((item) => item.category === searchParams.category);
  }

  return <AdvertisementsPage ads={finall} />;
};

export default Advertisements;
