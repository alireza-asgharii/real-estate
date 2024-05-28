import Link from "next/link";
import Card from "../modules/Card";
import NavLink from "../modules/NavLink";

const AdvertisementsPage = ({ ads }) => {
  const categories = [
    { name: "ویلا", query: "villa" },
    { name: "آپارتمان", query: "apartment" },
    { name: "فروشگاه", query: "store" },
    { name: "زمین", query: "earth" },
  ];
  return (
    <div className="md:flex ">
      <aside className="border-2 w-1/6 hidden md:block ml-3 p-2 rounded-md">
        <h5 className="pt-2 font-bold text-center">دسته بندی</h5>
        <div className="mt-2 text-sm">
          <ul>
            <li>
              <NavLink
                name="همه"
                href="/advertisements"
                queryName="category"
                queryValue={null}
              />
            </li>
            {categories.map((category) => (
              <li key={category.query}>
                <NavLink
                  name={category.name}
                  href={{
                    pathname: "/advertisements",
                    query: { category: category.query },
                  }}
                  queryValue={category.query}
                  queryName="category"
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="flex flex-wrap gap-2 border-2 rounded-md md:w-5/6 p-2">
        {ads.length === 0 && <p>هیچ آگهی موجود نیست</p>}
        {ads.map((item) => (
          <Link
            href={`/advertisements/${item._id}`}
            className="inline-blockw-full max-h-40 w-full md:w-fit md:min-w-52 sm:w-fit border-2 rounded-md p-2 border-[#BED7DC] hover:border-header-theme hover:shadow-lg transition-colors"
            key={item._id}
          >
            <Card data={item} />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default AdvertisementsPage;
