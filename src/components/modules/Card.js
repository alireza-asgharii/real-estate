import { MdOutlineVilla } from "react-icons/md";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { MdOutlineLandslide } from "react-icons/md";
import { MdOutlineStorefront } from "react-icons/md";
import { priceFormat } from "@/utils/numberFormat";


const Card = ({ data: {category, title, location, price} }) => {
  const icon = {
    villa: <MdOutlineVilla />,
    apartment: <PiBuildingApartmentBold />,
    earth: <MdOutlineLandslide />,
    store: <MdOutlineStorefront />,
  }
  return (
    <div className="flex flex-col px-1">
      <span>{icon[category]}</span>
      <h4 className="py-2 font-bold">{title}</h4>
      <span className="text-sm w-full">{location}</span>
      <span className="text-sm w-full pt-[2px]">{priceFormat(price)} تومان</span>
    </div>
  );
};

export default Card;
