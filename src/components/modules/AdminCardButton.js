"use client";

import { useState, useTransition } from "react";
import { acceptAd, rejectAd } from "@/actions/adminActions";
import Spiner from "./Spiner";
import toast from "react-hot-toast";
import { revalidate } from "@/actions/actions";
import { GoKebabHorizontal } from "react-icons/go";

const AdminCardButton = ({ adsId }) => {
  const [rejectAdPending, startRejectAd] = useTransition();
  const [acceptAdPending, startAcceptAd] = useTransition();
  const [isOpen, setOpen] = useState(false);
  const [editPending, setEditPending] = useState(false);

  const rejectAdHandler = (e, adsId) => {
    startRejectAd(async () => {
      e.stopPropagation();
      const res = await rejectAd(adsId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      revalidate("/dashboard/admin");
      revalidate("/advertisements");
    });
  };

  const acceptAdHandler = (e, adsId) => {
    startAcceptAd(async () => {
      e.stopPropagation();
      const res = await acceptAd(adsId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      revalidate("/dashboard/admin");
      revalidate("/advertisements");
    });
  };

  const openHandler = () => {
    setOpen((prevState) => !prevState);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const fixHandler = (e) => {
    e.preventDefault();
  };

  const editOpenHandler = (e) => {
    setEditPending(true);
  };

  return (
    <>
      <div className="absolute bottom-0 left-1">
        <div className="relative" tabIndex="0" onBlur={closeHandler}>
          <button
            title="منو"
            className="text-xl rounded-sm [&_svg]:h-4 z-10 bg-white"
            onClick={openHandler}
          >
            <GoKebabHorizontal />
          </button>
          {isOpen && (
            <div className="flex justify-between flex-col mb-3 w-28 absolute bg-white shadow-sm border-2 -top-14 left-0  rounded-md overflow-hidden">
              <button
                onClick={(e) => rejectAdHandler(e, adsId)}
                onMouseDown={fixHandler}
                disabled={rejectAdPending}
                title="رد کردن آگهی"
                className="flex items-center justify-center text-center px-2 py-1 text-xs  transition-colors hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed"
              >
                <span className="pl-1">رد کردن</span>
                {rejectAdPending && (
                  <Spiner w="w-[10px]" h="h-[10px]" border="border-2" />
                )}
              </button>
              <button
                disabled={acceptAdPending}
                onMouseDown={fixHandler}
                onClick={(e) => acceptAdHandler(e, adsId)}
                title="انتشار آگهی"
                className={` flex items-center justify-center min-w-12 px-2 py-1 text-xs transition-colors hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed`}
              >
                <span className="pl-1">انتشار آگهی</span>
                {acceptAdPending && (
                  <Spiner w="w-[10px]" h="h-[10px]" border="border-2" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCardButton;
