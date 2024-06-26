"use client";

import { useState, useTransition } from "react";
import { changeUserName } from "@/actions/dashboardActions";
import TextInput from "./TextInput";
import Spiner from "./Spiner";
import toast from "react-hot-toast";
import { revalidate } from "@/actions/actions";

const DashboardForm = ({ name = "" }) => {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    fullName: name,
  });

  const [isError, setError] = useState({
    fullName: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await changeUserName(form.fullName);
      console.log(res);

      if (res.error) {
        toast.error(res.error);
      } else if (res.message) {
        await revalidate("dashboard/settings");
        toast.success(res.message);
        await revalidate("dashboard");
      }
    });
  };
  return (
    <form className="flex items-center py-3" onSubmit={submitHandler}>
      <TextInput
        type="text"
        name="fullName"
        placeholder="نام و نام خانوادگی"
        form={form}
        changehandler={changeHandler}
        isError={isError}
        className="w-56 [&_input]:py-2  "
      />
      <button
        disabled={isPending}
        className="disabled:cursor-not-allowed border-2 rounded-md px-3 py-1 text-sm mr-6 flex justify-center items-center"
      >
        <span>ذخیره</span>
        {isPending && (
          <span className="mr-2 flex justify-center items-center">
            <Spiner w="w-3" h="h-3" border="border-2" />
          </span>
        )}
      </button>
    </form>
  );
};

export default DashboardForm;
