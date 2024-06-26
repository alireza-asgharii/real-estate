import { getServerSession } from "next-auth";
import Profile from "../modules/Profile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavLink from "../modules/NavLink";
import LogoutButton from "../modules/LogoutButton";

const DashboardSidebar = async ({ role }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="border-2 w-1/6 hidden md:block ml-3 p-2 rounded-md">
      <div className="flex flex-col justify-center items-center border-b-2">
        <Profile name={session?.user?.email ?? "P"} />
        {role === "ADMIN" && <span className="rounded-md py-1 px-2 text-xs">ادمین</span>}
        <p className="pt-2">{session?.user?.email}</p>
      </div>
      <div className="mt-6 text-sm">
        <ul>
          <li>
            <NavLink name="حساب کاربری" href="/dashboard" />
          </li>
          <li>
            <NavLink name="آگهی های من" href="/dashboard/my-ads" />
          </li>
          <li>
            <NavLink name="ثبت آگهی" href="/dashboard/add" />
          </li>
          {role === "ADMIN" && (
            <li>
              <NavLink name="پنل ادمین" href="/dashboard/admin" />
            </li>
          )}
          <li>
            <NavLink name="تنظیمات" href="/dashboard/settings" />
          </li>
        </ul>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardSidebar;
