"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Spiner from "./Spiner";

const HeaderButton = () => {
  const { status } = useSession();
  return (
    <div className="flex justify-center items-center">
      {status === 'loading' ? (
        <span className="px-3 py-[5px] flex justify-center items-center">
          <Spiner w="w-5" h="h-5" border="border-2" />
        </span>
      ) : status === "authenticated" ? (
        <Link
          href="/dashboard"
          className="px-3 py-1 hover:bg-white hover:text-black transition-colors rounded-md"
        >
          داشبورد
        </Link>
      ) : (
        <Link
          href="/auth/signin"
          className="px-3 py-1 hover:bg-white hover:text-black transition-colors rounded-md"
        >
          ورود
        </Link>
      )}
    </div>
  );
};

export default HeaderButton;
