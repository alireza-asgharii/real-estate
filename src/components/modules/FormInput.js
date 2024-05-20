"use client";

import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const FormInput = ({
  name,
  type,
  placeholder,
  form,
  isFocuse,
  focusHandler,
  blurHandler,
  isError,
}) => {
  const [isShow, setShow] = useState(false);
  const isShowHandler = (e) => {
    e.stopPropagation();

    setShow((prev) => !prev);
  };

  const [fisrt, setFirst] = useState(false);

  return (
    <label
      name={name}
      className={`border-2 ${
        isError[name] && !isFocuse[name] && fisrt ? "border-red-400" : ""
      } relative my-[7px] rounded-md`}
      onFocus={focusHandler}
      onBlur={blurHandler}
      onClick={() => setFirst(true)}
    >
      <span
        className={`absolute text-sm text-gray-400 ${
          isFocuse[name] || form[name].length !== 0
            ? "top-[-15px] right-1 bg-white rounded-md px-1"
            : "top-[7px] right-2"
        }  select-none cursor-text transition-all`}
      >
        {placeholder}
      </span>
      {type === "password" && (
        <span
          onClick={isShowHandler}
          className="absolute left-1 top-2 md:cursor-pointer opacity-80 select-none rounded-md "
        >
          {isShow ? <VscEye /> : <VscEyeClosed />}
        </span>
      )}
      <input
        className={`px-2 w-full py-[5px] ${
          type === "password" ? "pl-[23px]" : ""
        }  rounded-md outline-header-theme transition-colors`}
        type={
          type === "email"
            ? "email"
            : type === "password" && isShow
            ? "text"
            : "password"
        }
        name={name}
        defaultValue={form[name]}
        onFocus={() => setFirst(true)}
        required
      />
    </label>
  );
};

export default FormInput;
