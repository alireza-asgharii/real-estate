import Image from "next/image";
import Link from "next/link";

const HomePageCard = ({ data: { name, path } }) => {
  return (
    <Link
      href="/"
      className="inline-block my-2 md:p-1 md:mx-3 mx-4 shadow-[1px_2px_8px] shadow-purple-200 rounded-md md:w-[200px] hover:rotate-2 transition-transform"
    >
      <div className="h-3/4 object-cover">
        <Image
          className="rounded-md w-full h-full object-cover"
          src={`/static/images/${path}.png`}
          width={200}
          height={200}
          alt={name}
          priority="true"
        />
      </div>
      <p className="text-header-theme text-sm text-center pt-3 pb-1">{name}</p>
    </Link>
  );
};

export default HomePageCard;
