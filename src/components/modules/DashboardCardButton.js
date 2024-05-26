'use client'

const DashboardCardButton = ({adsId}) => {
  return (
    <div className="flex justify-between mt-3">
      <button title="ویرایش آگهی" className="border-2 px-2 py-1 rounded-md text-xs border-green-500 transition-colors hover:bg-green-500 hover:text-white">
        ویرایش
      </button>
      <button title="حذف آگهی" className="border-2 px-2 py-1 rounded-md text-xs border-red-400 transition-colors hover:bg-red-400 hover:text-white">
        حذف
      </button>
    </div>
  );
};

export default DashboardCardButton;
