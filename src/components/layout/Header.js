import Link from "next/link";
import HeaderButton from "../modules/HeaderButton";
import DashMeButton from "../modules/DashMeButton";
import NavbarLink from "../modules/NavbarLink";

const Header = async () => {
  return (
    <header className="flex justify-between items-center text-white rounded-sm md:rounded-md bg-header-theme px-2 py-3">
      <div>
        <NavbarLink href="/">صفحه اصلی </NavbarLink>
        <NavbarLink href="/advertisements" style='mr-1'>آگهی ها </NavbarLink>
      </div>
      <div className="flex items-center">
        <HeaderButton />
        <DashMeButton />
      </div>
    </header>
  );
};

export default Header;
