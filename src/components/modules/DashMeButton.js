"use client";

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (pathname.startsWith("/dashboard") && status === "authenticated")
    return (
      <div className="md:hidden" onFocus={openHandler} onBlur={closeHandler} tabIndex="0">
        <button
          onClick={openHandler}
          className=" border-2 px-2 mr-2 rounded-md"
        >
          منو
        </button>
        <DashboardMenu data={data} open={open} setOpen={setOpen} />
      </div>
    );
};

export default DashMeButton;
