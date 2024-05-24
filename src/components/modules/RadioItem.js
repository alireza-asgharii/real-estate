const RadioItem = ({ title, value, chekedItem, changeHandler }) => {
  return (
    <label className="border-2 flex justify-center items-center w-fit px-2 py-1 rounded-md text-sm md:cursor-pointer">
      <span className="pl-1">{title}</span>
      <input
        type="radio"
        value={value}
        name="category"
        checked={chekedItem === value}
        onChange={changeHandler}
        className="cursor-pointer"
      />
    </label>
  );
};

export default RadioItem;
