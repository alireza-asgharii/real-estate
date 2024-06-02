import Link from "next/link";
import Card from "./Card";
import DashboardCardButton from "./DashboardCardButton";

const DashboardCard = ({ data }) => {
  const { _id, status } = data;
  return (
    <div className="w-full sm:w-fit border-2 rounded-md p-2 border-[#BED7DC] hover:border-header-theme hover:shadow-lg transition-colors relative">
      {status === "waiting" && (
        <span className="absolute top-2 left-1 text-xs  rounded-md px-1 py-[2px] bg-gray-500 text-white">در انتظار تایید</span>
      )}
      {status === "rejected" && (
        <span className="absolute top-2 left-1 text-xs  rounded-md px-1 py-[2px] bg-red-500 text-white">رد شده</span>
      )}
      {status === "verified" && (
        <span className="absolute top-2 left-1 text-xs  rounded-md px-1 py-[2px] bg-green-500 text-white">تایید شده</span>
      )}
      <DashboardCardButton adsId={JSON.parse(JSON.stringify(_id))} />
      <Link
        title="مشاهده آگهی"
        href="/"
        className="inline-block w-full md:w-fit md:min-w-52 min-h-40"
      >
        <Card data={data} />
      </Link>
    </div>
  );
};

export default DashboardCard;
