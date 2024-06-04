"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLink = ({ children, href, style }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link
      href={href}
      className={` px-2 py-1 hover:border-white border-2 border-transparent transition-colors rounded-md ${style} ${
        href === "/"
          ? pathname === "/"
            ? "bg-white text-black"
            : ""
          : pathname.startsWith(href)
          ? "bg-white text-black"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
