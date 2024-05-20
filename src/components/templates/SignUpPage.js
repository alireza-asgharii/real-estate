"use client";

import { useSignUp } from "@/hooks/useMutation";
import Link from "next/link";
import { useEffect, useState } from "react";
import FormInput from "../modules/FormInput";
import Spiner from "../modules/Spiner";
import toast from "react-hot-toast";
import { formValidation } from "@/utils/validation";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [isFocuse, setFocuse] = useState({
    email: false,
    password: false,
    rePassword: false,
  });
  const [isError, setError] = useState(formValidation(form, "signup"));

  const { isPending, error, mutate, data } = useSignUp();
  // console.log({ isPending, error, mutate, data });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  useEffect(() => {
    setError(formValidation(form, "signup"));
  }, [form]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(isError).length) {
      toast.error(Object.values(isError)[0]);
      return
    }

    mutate(form, {
      onSuccess: () => {
        toast.success("ثبت نام با موفقیت انجام شد")
        router.push('/auth/signin')
      },
      onError: (err) =>
        toast.error(err?.response?.data?.error ?? "عملیات ناموفق"),
    });
  };

  const focusHandler = (e) => {
    const { name } = e.target;
    setFocuse({ ...isFocuse, [name]: true });
  };

  const blurHandler = (e) => {
    const { name } = e.target;
    setFocuse({ ...isFocuse, [name]: false });
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-48px)]  flex flex-col justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="flex w-80 border-2 flex-col pt-10 pb-5 px-4 rounded-md "
        onChange={changeHandler}
      >
        <h4 className="pb-6 text-center text-header-theme font-bold text-xl">
          فرم ثبت نام
        </h4>
        <FormInput
          name="email"
          type="email"
          placeholder="ایمیل"
          form={form}
          isFocuse={isFocuse}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          isError={isError}
          
          
        />
        <FormInput
          name="password"
          type="password"
          placeholder="رمز عبور"
          form={form}
          isFocuse={isFocuse}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          isError={isError}
        />
        <FormInput
          name="rePassword"
          type="password"
          placeholder="تکرار رمز عبور"
          form={form}
          isFocuse={isFocuse}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          isError={isError}
        />

        <button
          disabled={isPending}
          type="submit"
          className="bg-header-theme hover:bg-[#10439F] disabled:hover:bg-header-theme disabled:opacity-90 transition-colors text-white rounded-md py-2 mt-8 mb-3 flex items-center justify-center"
        >
          <span className="pl-2">ثبت نام</span>
          {isPending && <Spiner w="w-5" h="h-5" border="border-[3px]" />}
        </button>
      </form>
      <span className="mt-3 text-sm">
        حساب کاربری دارید؟
        <Link
          href="/auth/signin"
          className="px-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          ورود
        </Link>
      </span>
    </div>
  );
};

export default SignUpPage;
