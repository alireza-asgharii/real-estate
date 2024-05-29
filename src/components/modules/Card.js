import { priceFormat } from "@/utils/numberFormat";
import { categoris } from "@/constant/icons";


const Card = ({ data: {category, title, location, price} }) => {
  
  return (
    <div className="flex flex-col px-1">
      <span>{categoris[category].icon}</span>
      <h4 className="py-2 font-bold">{title}</h4>
      <span className="text-sm w-full">{location}</span>
      <span className="text-sm w-full pt-[2px]">{priceFormat(price)} تومان</span>
    </div>
  );
};

export default Card;
