"use client";

import { IoClose, IoMenu } from "react-icons/io5";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardMenu from "./DashboardMenu";

const DashMeButton = () => {
  const pathname = usePathname();
  const { status, data } = useSession();
  const [open, setOpen] = useState(false);

  const openHandler = (e) => {
    setOpen(true);
  };
  const closeHandler = (e) => {
    setOpen(false);
  };

  const menuHandler = (e) => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (pathname.startsWith("/dashboard") && status === "authenticated")
    return (
      <div
        className="md:hidden flex justify-center items-center"
        onFocus={openHandler}
        onBlur={closeHandler}
        tabIndex="0"
      >
        <button
          onClick={menuHandler}
          className="text-3xl mr-2 rounded-md inline-block"
        >
          {open ? <IoClose /> : <IoMenu />}
        </button>

        <DashboardMenu data={data} open={open} setOpen={setOpen} />
      </div>
    );
};

export default DashMeButton;
