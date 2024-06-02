import Profile from "./Profile";
import MenuNavLink from "./MenuNavLink";
import LogoutButton from "./LogoutButton";

const DashboardMenu = ({ data, open, setOpen }) => {
  const fixHandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setOpen(false);
    }, 10);
  };

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
      </ul>
      <div className="text-center">
        <LogoutButton fixHandler={fixHandler} />
      </div>
    </div>
  );
};

export default DashboardMenu;
