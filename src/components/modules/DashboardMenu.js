import Profile from "./Profile";
import MenuNavLink from "./MenuNavLink";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

const DashboardMenu = ({ data, open, setOpen }) => {
  const [user, setUser] = useState();

  const fixHandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setOpen(false);
    }, 10);
  };

  useEffect(() => {
    const x = async () => {
      const res = await fetch("/api/whoamI", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUser(data);
    };
    x();
  }, []);

  return (
    <div
      className={`text-sm border-[1px] rounded-r-sm shadow-md p-3 bg-white text-black z-10 h-screen fixed left-0 top-14 w-3/4 -translate-x-[-1000px] ${
        open ? "animate-opneMenu" : ""
      }`}
    >
      <div className="flex justify-center items-end flex-col">
        <Profile name={data.user.email} />
        <p className="pt-2 text-gray-700">{data.user.email}</p>
      </div>

      <ul className="text-left mt-4 text-sm">
        <li>
          <MenuNavLink
            name="حساب کاربری"
            href="/dashboard"
            fixHandler={fixHandler}
          />
        </li>
        <li>
          <MenuNavLink
            name="آگهی های من"
            href="/dashboard/my-ads"
            fixHandler={fixHandler}
          />
        </li>
        <li>
          <MenuNavLink
            name="ثبت آگهی"
            href="/dashboard/add"
            fixHandler={fixHandler}
          />
        </li>
        {user?.user?.role === "ADMIN" && (
          <li>
            <MenuNavLink
              name="پنل ادمین"
              href="/dashboard/admin"
              fixHandler={fixHandler}
            />
          </li>
        )}
        <li>
          <MenuNavLink
            name="تنظیمات"
            href="/dashboard/settings"
            fixHandler={fixHandler}
          />
        </li>
      </ul>
      <div className="text-center">
        <LogoutButton fixHandler={fixHandler} />
      </div>
    </div>
  );
};

export default DashboardMenu;
