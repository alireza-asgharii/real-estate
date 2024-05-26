import DashboardCard from "../modules/DashboardCard";

const MyAdsPage = async ({ ads }) => {
  console.log(ads);
  return (
    <div>
      {ads.length === 0 && <p>هیچ آگهی ثبت نشده است.</p>}
      <div className="flex flex-wrap gap-2">
        {ads.map((item) => (
          <DashboardCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default MyAdsPage;
