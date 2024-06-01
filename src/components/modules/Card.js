import Image from "next/image";
import { priceFormat } from "@/utils/numberFormat";
import { categoris } from "@/constant/icons";

import supabase from "@/lib/supabase";

const Card = async ({ data: { category, title, location, price, images } }) => {
  const { data } = supabase.storage.from("images2").getPublicUrl(images);

  return (
    <div className="md:w-52">
      <div className="rounded-md mb-2 overflow-hidden h-[140px]">
        {!images && (
          <span className="border-2 rounded-md w-full h-full flex justify-center items-center">
            بدون تصاویر
          </span>
        )}
        {images && (
          <Image
            className={`w-full h-full object-cover `}
            src={data.publicUrl}
            width={300}
            height={300}
            alt="image"
          />
        )}
      </div>
      <div className="flex flex-col">
        <span>{categoris[category].icon}</span>
        <h4 className="py-2 font-bold">{title}</h4>
        <span className="text-sm w-full">{location}</span>
        <span className="text-sm w-full pt-[2px]">
          {priceFormat(price)} تومان
        </span>
      </div>
    </div>
  );
};

export default Card;
