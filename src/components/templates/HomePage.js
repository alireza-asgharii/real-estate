import Link from "next/link";
import HomePageCard from "../modules/HomePageCard";
import { FaMountainCity } from "react-icons/fa6";
import { cities, services, types } from "@/constant/homePageData";

const HomePage = () => {
  return (
    <div>
      <header className="w-full flex justify-center items-center flex-col h-40 py-32">
        <h1 className="font-bold text-header-theme text-3xl">
          سامانه خرید و اجاره ی ملک
        </h1>
        <div className="pt-4">
          {services.map((item) => (
            <span
              className="py-1 px-3 rounded-md bg-blue-200 text-header-theme mx-2"
              key={item}
            >
              {" "}
              {item}
            </span>
          ))}
        </div>
      </header>

      <section className="text-center flex justify-center flex-col md:flex-row">
        {types.map((item) => (
          <HomePageCard key={item} data={item} />
        ))}
      </section>

      <section className="mt-20 pb-44 px-3 max-w-[900px] m-auto">
        <h5 className="text-center font-bold text-xl text-header-theme">
          شهر های پر بازدید
        </h5>
        <div className="mt-4  grid grid-cols-4 gap-x-5 gap-y-2">
          {cities.map((city) => (
            <Link
              href="/"
              key={city}
              className="flex justify-center items-center py-2 px-2 rounded-md bg-blue-200 text-header-theme  min-w-10 text-center"
            >
              <FaMountainCity />
              <span className="pr-1">{`${city} `}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
