"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import SignInFormInput from "../modules/SignInFormInput";
import Spiner from "../modules/Spiner";
import toast from "react-hot-toast";
import { formValidation } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { revalidateSignIn } from "@/actions/actions";

const SignInPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isFocuse, setFocuse] = useState({
    email: false,
    password: false,
  });
  const [isError, setError] = useState(formValidation(form, "signin"));
  const [isPending, startTransition] = useTransition();

  // const { isPending, error, mutate, data } = useSignUp();
  // console.log({ isPending, error, mutate, data });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  useEffect(() => {
    setError(formValidation(form, "signin"));
  }, [form]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(isError).length) {
      toast.error(Object.values(isError)[0]);
      return;
    }

    startTransition(async () => {
      const res = await signIn("credentials", {
        ...form,
        redirect: false,
      });
      console.log(res);

      if (!res.ok) {
        toast.error(res?.error);
      } else if (res.ok) {
        toast.success("ورود با موفیت انجام شد");
        await revalidateSignIn()
        router.replace("/");
      }
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
          فرم ورود به حساب کاربری
        </h4>
        <SignInFormInput
          name="email"
          type="email"
          placeholder="ایمیل"
          form={form}
          isFocuse={isFocuse}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          isError={isError}
        />
        <SignInFormInput
          name="password"
          type="password"
          placeholder="رمز عبور"
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
          <span className="pl-2">ورود</span>
          {isPending && <Spiner w="w-5" h="h-5" border="border-[3px]" />}
        </button>
      </form>
      <span className="mt-3 text-sm">
        حساب کاربری ندارید؟
        <Link
          href="/auth/signup"
          className="px-2 text-blue-500 hover:text-blue-700 transition-colors"
        >
          ثبت نام
        </Link>
      </span>
    </div>
  );
};

export default SignInPage;
