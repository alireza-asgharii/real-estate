"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NavLink = ({ name, href, queryName, queryValue }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get(queryName);

  return (
    <Link
      href={href}
      className={`inline-block w-full my-1  p-2 rounded-md ${
        query
          ? query === queryValue
            ? "bg-header-theme text-white"
            : ""
          : pathname === href
          ? "bg-header-theme text-white"
          : ""
      } hover:border-header-theme border-2 border-transparent transition-colors`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
