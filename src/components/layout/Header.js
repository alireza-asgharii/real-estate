import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center text-white rounded-sm md:rounded-md bg-header-theme px-2 py-3">
      <div>
        <Link href="/" className="px-2 py-1 hover:bg-white hover:text-black transition-colors rounded-md">صفحه اصلی </Link>
        <Link href="/advertisements" className="px-2 py-1 hover:bg-white hover:text-black transition-colors rounded-md">آگهی ها </Link>
      </div>
      <div>
        <Link href="/auth/signin" className="px-3 py-1 hover:bg-white hover:text-black transition-colors rounded-md">ورود</Link>
      </div>
    </header>
  );
};

export default Header;
