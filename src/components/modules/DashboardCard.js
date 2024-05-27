import Link from "next/link";
import Card from "./Card";
import DashboardCardButton from "./DashboardCardButton";

const DashboardCard = ({ data }) => {
  const { _id } = data;
  return (
    <div className="w-full sm:w-fit border-2 rounded-md p-2 border-[#BED7DC] hover:border-header-theme hover:shadow-lg transition-colors">
      <Link
        title="مشاهده آگهی"
        href="/"
        className="inline-block w-full md:w-fit md:min-w-52 min-h-40"
      >
        <Card data={data} />
      </Link>
      <DashboardCardButton adsId={JSON.parse(JSON.stringify(_id))} />
    </div>
  );
};

export default DashboardCard;
