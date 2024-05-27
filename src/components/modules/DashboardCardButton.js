"use client";

import { deleteAd } from "@/actions/dashboardActions";
import Link from "next/link";
import { useTransition } from "react";
import Spiner from "./Spiner";
import toast from "react-hot-toast";

const DashboardCardButton = ({ adsId }) => {
  const [isPending, startTransiotion] = useTransition();

  const deleteHadler = (e, adsId) => {
    startTransiotion(async () => {
      e.stopPropagation();
      const res = await deleteAd(adsId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
    });
  };

  return (
    <div className="flex justify-between mt-3">
      <Link
        href={`/dashboard/my-ads/${adsId}`}
        title="ویرایش آگهی"
        className="border-2 px-2 py-1 rounded-md text-xs border-green-500 transition-colors hover:bg-green-500 hover:text-white"
      >
        ویرایش
      </Link>
      <button
        disabled={isPending}
        onClick={(e) => deleteHadler(e, adsId)}
        title="حذف آگهی"
        className={`flex items-center justify-center min-w-12 border-2 px-2 py-1 rounded-md text-xs border-red-400 transition-colors ${
          isPending ? "bg-red-400" : ""
        } hover:bg-red-400 hover:text-white disabled:cursor-not-allowed`}
      >
        {isPending ? (
          <Spiner w="w-3" h="h-3" border="border-2" />
        ) : (
          <span>حذف</span>
        )}
      </button>
    </div>
  );
};

export default DashboardCardButton;
