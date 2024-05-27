import DashboardAddPage from "@/components/templates/DashboardAddPage";
import Ad from "@/models/Ad";
import connectDB from "@/utils/connectDB";

const AdEdit = async ({ params: { adId } }) => {
  await connectDB();
  const ad = await Ad.findById(adId);
  return <DashboardAddPage ad={JSON.parse(JSON.stringify(ad))} />;
};

export default AdEdit;
