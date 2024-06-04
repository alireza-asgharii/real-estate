"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Spiner from "./Spiner";
import NavbarLink from "./NavbarLink";

const HeaderButton = () => {
  const { status } = useSession();
  return (
    <div className="flex justify-center items-center">
      {status === "loading" ? (
        <span className="px-3 py-[5px] flex justify-center items-center">
          <Spiner w="w-5" h="h-5" border="border-2" />
        </span>
      ) : status === "authenticated" ? (
        <NavbarLink href="/dashboard">داشبورد </NavbarLink>
      ) : (
        <NavbarLink href="/auth/signin">ورود </NavbarLink>
      )}
    </div>
  );
};

export default HeaderButton;
