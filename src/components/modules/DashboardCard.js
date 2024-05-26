import Link from "next/link";
import Card from "./Card";
import DashboardCardButton from "./DashboardCardButton";

const DashboardCard = ({ data }) => {
  const { _id } = data;
  return (
    <div className="w-full sm:w-fit">
      <Link
      title="مشاهده آگهی"
        href="/"
        className="inline-block md:flex flex-col justify-between border-2 max-md:w-full md:min-w-52 min-h-40 rounded-md p-2 border-[#BED7DC] hover:border-header-theme hover:shadow-lg shadow-header-theme transition-colors"
      >
        <Card data={data} />
        <DashboardCardButton adsId={JSON.parse(JSON.stringify(_id))} />
      </Link>
    </div>
  );
};

export default DashboardCard;
