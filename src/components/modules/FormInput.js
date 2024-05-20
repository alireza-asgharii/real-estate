"use client";

import { checkEmail } from "@/actions/actions";
import { useEffect, useState, useTransition } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { MdOutlineVerified } from "react-icons/md";
import { MdDoNotDisturb } from "react-icons/md";
import Spiner from "./Spiner";

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
  const [isPending, startTransition] = useTransition();
  const [isShow, setShow] = useState(false);
  const isShowHandler = (e) => {
    e.stopPropagation();

    setShow((prev) => !prev);
  };

  const [fisrt, setFirst] = useState(false);
  const [isAvailable, setAvailable] = useState({});

  useEffect(() => {
    if (name === "email") {
      const checkTime = setTimeout(
        () =>
          startTransition(async () => {
            const result = await checkEmail(form.email);
            setAvailable(result);
          }),
        500
      );

      return () => clearTimeout(checkTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form["email"], name]);

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

      {/* For toggle password visibility */}
      {type === "password" && (
        <span
          onClick={isShowHandler}
          className="absolute left-1 top-2 md:cursor-pointer opacity-80 select-none rounded-md "
        >
          {isShow ? <VscEye /> : <VscEyeClosed />}
        </span>
      )}

      {/* For check availabel email */}
      {type === "email" && (
        <span title={isAvailable?.isAvailable ? 'با این ایمیل حساب کاربری موجود نیست' : 'حساب کاربری از قبل موجود است'} className="absolute left-[5px] top-2 opacity-80 select-none rounded-md ">
          {isPending ? (
            <Spiner w="w-[13px]" h="h-[13px]" border="border-2" />
          ) : isAvailable?.isAvailable && form.email ? (
            <MdOutlineVerified />
          ) : (
            form.email && !isError[name] && <MdDoNotDisturb />
          )}
        </span>
      )}

      <input
        className={`px-2 w-full py-[5px] ${
          type === "password"
            ? "pl-[23px]"
            : type === "email"
            ? "pl-[25px]"
            : ""
        }  rounded-md outline-header-theme ${isError[name] ? 'outline-red-400' : ''} transition-colors`}
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
