import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

const DatePickerInput = ({ form, setForm, isError }) => {
  const changeHandler = (e) => {
    const d = new Date(e);
    setForm({ ...form, constructionDate: d });
  };
  const [fisrt, setFirst] = useState(false);
  const [isFocuse, setFocuse] = useState(false);

  const focusHandler = () => {
    setFocuse(true);
  };

  const blurHandler = () => {
    setFocuse(false);
  };
  return (
    <div>
      <div
        className={`border-2 px-1 py-[1px] w-fit  ${
          isFocuse ? "border-header-theme" : ""
        } ${
          isError["constructionDate"] && !isFocuse && fisrt
            ? "border-red-400"
            : ""
        } relative my-[7px] rounded-md`}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onClick={() => setFirst(true)}
      >
        <span
          className={`absolute text-sm text-gray-400 ${
            isFocuse || form["constructionDate"].length !== 0
              ? "top-[-14px] right-1 bg-white rounded-md px-1"
              : "top-[7px] right-2"
          }  select-none cursor-text transition-all`}
        >
          تاریخ
        </span>

        <DatePicker
          inputClass="border-none rounded-md px-2  px-2 py-[5px] w-full  rounded-md outline-none transition-colors`"
          calendar={persian}
          locale={persian_fa}
          value={form.constructionDate}
          onChange={changeHandler}
          calendarPosition="bottom-right"
        />
      </div>
    </div>
  );
};

export default DatePickerInput;
