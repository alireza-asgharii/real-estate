'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ name, href }) => {
  const pathname = usePathname();
  
  return (
    <Link
      href={href}
      className={`inline-block w-full my-1  p-2 rounded-md ${pathname === href ? 'bg-header-theme text-white' : ''} hover:bg-header-theme hover:opacity-80 hover:text-white transition-colors`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
