import Ad from "@/models/Ad";
import connectDB from "@/utils/connectDB";
import Card from "../modules/Card";
import Link from "next/link";
import AdminCardButton from "../modules/AdminCardButton";
import Message from "../modules/Message";

const AdminPage = async () => {
  await connectDB();
  const ads = await Ad.find({ published: false, status: "waiting" });
  return (
    <div>
      <div>
        <p className="py-2">آگهی های در انتظار تایید:</p>
        <div className="md:flex flex-wrap gap-2">
          {!ads.length && (
            <Message bg="bg-green-500" text="text-white">
              آگهی تایید نشده ای وجود ندارد
            </Message>
          )}
          {ads.map((item) => (
            <div
              key={item._id}
              className="md:min-w-52 min-h-40 border-2 rounded-md border-[#BED7DC] hover:border-header-theme hover:shadow-lg transition-colors"
            >
              <Link
                href={`/dashbaord/admin/${item._id}`}
                className="inline-block p-2"
              >
                <Card data={item} />
              </Link>
              <AdminCardButton adsId={JSON.parse(JSON.stringify(item._id))} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
