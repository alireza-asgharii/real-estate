"use client";

import { deleteAd } from "@/actions/dashboardActions";
import Link from "next/link";
import { useState, useTransition } from "react";
import Spiner from "./Spiner";
import toast from "react-hot-toast";

import { GoKebabHorizontal } from "react-icons/go";

const DashboardCardButton = ({ adsId }) => {
  const [isPending, startTransiotion] = useTransition();
  const [isOpen, setOpen] = useState(false);
  const [editPending, setEditPending] = useState(false);

  const deleteHadler = (e, adsId) => {
    startTransiotion(async () => {
      e.stopPropagation();
      const res = await deleteAd(adsId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      setOpen(false);
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
            <Link
              onClick={editOpenHandler}
              onMouseDown={fixHandler}
              href={`/dashboard/my-ads/${adsId}`}
              title="ویرایش آگهی"
              className="flex items-center justify-center text-center px-2 py-1 text-xs  transition-colors hover:bg-gray-500 hover:text-white"
            >
              <span className="pl-1">ویرایش</span>
              {editPending && (
                <Spiner w="w-[10px]" h="h-[10px]" border="border-2" />
              )}
            </Link>
            <button
              disabled={isPending}
              onMouseDown={fixHandler}
              onClick={(e) => deleteHadler(e, adsId)}
              title="حذف آگهی"
              className={` flex items-center justify-center min-w-12 px-2 py-1 text-xs transition-colors hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed`}
            >
              <span className="pl-1">حذف</span>
              {isPending && (
                <Spiner w="w-[10px]" h="h-[10px]" border="border-2" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCardButton;
