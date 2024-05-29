import AdDetailsPage from "@/components/templates/AdDetailsPage";
import Ad from "@/models/Ad";
import connectDB from "@/utils/connectDB";

const AdDetails = async ({ params }) => {
  await connectDB();
  const ad = await Ad.findById(params.id).select("-userId");
  console.log(ad);
  if (!ad) return <h4>آگهی یافت نشد</h4>;
  return <AdDetailsPage data={ad} />;
};

export default AdDetails;
