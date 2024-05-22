'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuNavLink = ({fixHandler, name, href}) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      onMouseDown={fixHandler}
      className={`inline-block w-full my-1  p-2  border-2 text-xs rounded-md ${pathname === href ? 'bg-header-theme border-header-theme text-white' : ''} hover:bg-header-theme hover:opacity-80 hover:text-white transition-colors`}
    >
      {name}
    </Link>
  );
};

export default MenuNavLink;
