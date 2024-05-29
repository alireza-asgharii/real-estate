import { toLocaleFormate } from "@/utils/dateFormat";
import { GrLocation } from "react-icons/gr";
import { MdOutlineDateRange } from "react-icons/md";

import {
  MdOutlineLandslide,
  MdOutlineRealEstateAgent,
  MdOutlineStorefront,
  MdOutlineVilla,
} from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { e2p, priceFormat } from "@/utils/numberFormat";
import { PiBuildingApartmentBold } from "react-icons/pi";

const AdDetailsPage = ({
  data: {
    title,
    description,
    location,
    phone,
    price,
    category,
    amenities,
    rules,
    constructionDate,
    realState,
  },
}) => {
  const categoris = {
    villa: { icon: <MdOutlineVilla />, fa: "ویلا" },
    apartment: { icon: <PiBuildingApartmentBold />, fa: "آپارتمان" },
    earth: { icon: <MdOutlineLandslide />, fa: "زمین" },
    store: { icon: <MdOutlineStorefront />, fa: "مغازه" },
  };

  return (
    <div className="md:flex flex-row-reverse gap-2">
      <aside className="border-2 p-1 rounded-md md:w-1/6 my-2 md:my-0">
        <div className="flex flex-col justify-center items-center p-3">
          <span className="text-header-theme text-4xl py-4">
            <MdOutlineRealEstateAgent />
          </span>
          <span>{realState}</span>
          <button type="tel" className="flex justify-center text-sm pt-1">
            <span className="pl-1 pt-[1px]">
              <IoCallOutline />
            </span>
            {e2p(phone)}
          </button>
        </div>

        <div className="text-sm mt-4 flex flex-col justify-center items-center">
          <span className="flex justify-center items-center py-2">
            <span className="pl-1">{categoris[category].icon}</span>
            {categoris[category].fa}
          </span>
          <span>{priceFormat(price)} تومان</span>
          {category !== "earth" && (
            <span className="flex py-2">
              <span className="pl-1 pt-[1px]">
                <MdOutlineDateRange />
              </span>
              {toLocaleFormate(constructionDate)}
            </span>
          )}
        </div>
      </aside>
      <section className="border-2 p-2 rounded-md md:w-5/6 my-2 md:my-0">
        <div>
          <h4 className="text text-header-theme font-[600]">{title}</h4>
          <span className="text-xs pt-2 w-fit flex justify-center items-center">
            <GrLocation />
            {location}
          </span>
        </div>

        <div className="py-9">
          <h5 className="text text-header-theme font-[600]">توضیحات:</h5>
          <p className="text-sm text-justify">{description}</p>
        </div>

        <div className="py-9">
          <h5 className="text text-header-theme font-[600]">امکانات رفاهی:</h5>
          {amenities.length === 0 && (
            <p className="text-sm">موردی ثبت نشده است</p>
          )}
          <ul className="text-xs pt-2 w-fit">
            {amenities.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="py-9">
          <h5 className="text text-header-theme font-[600]">قوانین:</h5>
          {rules.length === 0 && <p className="text-sm">موردی ثبت نشده است</p>}
          <ul className="text-xs pt-2 w-fit">
            {rules.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdDetailsPage;
