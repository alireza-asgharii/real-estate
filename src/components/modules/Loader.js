import Spiner from "./Spiner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-48px)]">
      <Spiner
        w="w-8"
        h="h-8"
        border="border-4"
        borderColor="border-gray-200"
        borderTop="border-t-header-theme"
      />
    </div>
  );
};

export default Loader;
