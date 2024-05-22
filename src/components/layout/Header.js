import Link from "next/link";
import HeaderButton from "../modules/HeaderButton";
import DashMeButton from "../modules/DashMeButton";

const Header = async () => {
  return (
    <header className="flex justify-between items-center text-white rounded-sm md:rounded-md bg-header-theme px-2 py-3">
      <div>
        <Link
          href="/"
          className="px-2 py-1 hover:bg-white hover:text-black transition-colors rounded-md"
        >
          صفحه اصلی{" "}
        </Link>
        <Link
          href="/advertisements"
          className="px-2 py-1 hover:bg-white hover:text-black transition-colors rounded-md"
        >
          آگهی ها{" "}
        </Link>
      </div>
      <div className="flex items-center">
        <HeaderButton />
        <DashMeButton />
      </div>
    </header>
  );
};

export default Header;
