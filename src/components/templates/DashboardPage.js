import { toLocaleFormate } from "@/utils/dateFormat";
import { getUserdetails } from "@/utils/cachedData";

const DashboardPage = async () => {
  const user = await getUserdetails();

  return (
    <div className="w-full">
      <h3 className="py-3">
        {user?.name ? `سلام ${user?.name.split(" ")[0]}` : "سلام"}
        👋
      </h3>
      <p>آگهی های خود را میتوانید در این پنل ثبت کنید</p>
      <div className="mt-2">
        <p className="bg-[#CDE8E5] rounded-md p-1 w-fit text-sm">
          <span className="text-black pl-3">تاریخ عضویت:</span>
          <span className="opacity-50">{toLocaleFormate(user.createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
