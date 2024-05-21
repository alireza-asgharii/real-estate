"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const HeaderButton = () => {
  const { status } = useSession();
  return (
    <div>
      {status === 'authenticated' ? (
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
