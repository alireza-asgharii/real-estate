import RadioItem from "./RadioItem";

const RadioList = ({ form, setForm }) => {
  const changeHandler = (e) => {
    setForm({ ...form, category: e.target.value });
  };
  return (
    <div className="flex justify-between py-2">
      <RadioItem
        title="ویلا"
        value="vila"
        changeHandler={changeHandler}
        chekedItem={form.category}
      />
      <RadioItem
        title="آپارتمان"
        value="apartment"
        changeHandler={changeHandler}
        chekedItem={form.category}
      />
      <RadioItem
        title="فروشگاه"
        value="store"
        changeHandler={changeHandler}
        chekedItem={form.category}
      />
      <RadioItem
        title="زمین"
        value="earth"
        changeHandler={changeHandler}
        chekedItem={form.category}
      />
    </div>
  );
};

export default RadioList;
