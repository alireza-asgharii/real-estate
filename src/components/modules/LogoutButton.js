"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = ({ fixHandler }) => {
  const router = useRouter();
  const signOutHandler = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };
  return (
    <div>
      <button
        onMouseDown={fixHandler}
        onClick={signOutHandler}
        className="text-red-500 max-md:text-xs mt-6 border-2 p-1 rounded-md border-red-500 hover:bg-red-500 hover:text-white transition-colors"
      >
        خروج از حساب کاربری
      </button>
    </div>
  );
};

export default LogoutButton;
