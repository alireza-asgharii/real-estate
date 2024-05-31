"use client";

import { useTransition } from "react";
import { acceptAd, rejectAd } from "@/actions/adminActions";
import Spiner from "./Spiner";
import toast from "react-hot-toast";
import { revalidate } from "@/actions/actions";

const AdminCardButton = ({ adsId }) => {
  const [rejectAdPending, startRejectAd] = useTransition();
  const [acceptAdPending, startAcceptAd] = useTransition();

  const rejectAdHandler = (e, adsId) => {
    startRejectAd(async () => {
      e.stopPropagation();
      const res = await rejectAd(adsId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      revalidate('/dashboard/admin')
      revalidate('/advertisements')
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
      revalidate('/dashboard/admin')
      revalidate('/advertisements')
    });
  };

  return (
    <div className="flex justify-between mt-3 p-2">
      <button
        disabled={acceptAdPending}
        onClick={(e) => acceptAdHandler(e, adsId)}
        title="انتشار آگهی"
        className={`flex items-center justify-center min-w-12 border-2 px-2 py-1 rounded-md text-xs border-green-500 transition-colors hover:bg-green-500 hover:text-white ${
          acceptAdPending ? "bg-green-500" : ""
        }`}
      >
        {acceptAdPending ? (
          <Spiner w="w-3" h="h-3" border="border-2" />
        ) : (
          <span>انتشار آگهی</span>
        )}{" "}
      </button>
      <button
        disabled={rejectAdPending}
        onClick={(e) => rejectAdHandler(e, adsId)}
        title="رد کردن آگهی"
        className={`flex items-center justify-center min-w-12 border-2 px-2 py-1 rounded-md text-xs border-red-400 transition-colors ${
          rejectAdPending ? "bg-red-400" : ""
        } hover:bg-red-400 hover:text-white disabled:cursor-not-allowed`}
      >
        {rejectAdPending ? (
          <Spiner w="w-3" h="h-3" border="border-2" />
        ) : (
          <span>رد کردن</span>
        )}
      </button>
    </div>
  );
};

export default AdminCardButton;
