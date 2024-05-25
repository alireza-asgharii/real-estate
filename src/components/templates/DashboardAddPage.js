"use client";

import { useEffect, useState } from "react";
import TextInput from "../modules/TextInput";
import { p2e } from "@/utils/numberFormat";
import RadioList from "../modules/RadioList";
import TextList from "../modules/TextList";
import DatePickerInput from "../modules/DatePickerInput";
import toast from "react-hot-toast";
import { useCreateAd } from "@/hooks/useMutation";
import { useRouter } from "next/navigation";
import { adFormValidation } from "@/utils/validation";

const DashboardAddPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });
  const [isError, setError] = useState(adFormValidation(form));
  const { mutate, isPending, error, data } = useCreateAd();
  // console.log({ mutate, isPending, error, data });
  const router = useRouter();

  const changehandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: p2e(value) });
  };

  useEffect(() => {
    setError(adFormValidation(form));
  }, [form]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);

    if (Object.keys(isError).length !== 0) {
      toast.error(Object.values(isError)[0]);
      return;
    }

    mutate(form, {
      onSuccess: () => {
        toast.success("آگهی با موفقیت ثبت شد");
        setForm({
          title: "",
          description: "",
          location: "",
          phone: "",
          price: "",
          realState: "",
          constructionDate: new Date(),
          category: "",
          rules: [],
          amenities: [],
        });

        // redirect to my-profile
        router.push('/dashboard')
      },
      onError: (e) => toast.error(e.response.data.error),
    });
  };

  return (
    <div className="text-sm">
      <form className="md:w-1/3 flex flex-col ">
        <TextInput
          form={form}
          name="title"
          placeholder="عنوان"
          type="text"
          isError={isError}
          changehandler={changehandler}
        />
        <TextInput
          form={form}
          name="description"
          placeholder="توضیحات"
          type="text"
          textArea={true}
          isError={isError}
          changehandler={changehandler}
        />
        <TextInput
          form={form}
          name="location"
          placeholder="آدرس"
          type="text"
          isError={isError}
          changehandler={changehandler}
        />
        <TextInput
          form={form}
          name="phone"
          placeholder="شماره تماس"
          type="text"
          isError={isError}
          changehandler={changehandler}
        />
        <TextInput
          form={form}
          name="price"
          placeholder="قیمت(تومان)"
          type="number"
          isError={isError}
          changehandler={changehandler}
        />
        <TextInput
          form={form}
          name="realState"
          placeholder="بنگاه"
          type="text"
          isError={isError}
          changehandler={changehandler}
        />

        <RadioList setForm={setForm} form={form} />

        <TextList type="rules" form={form} setForm={setForm} />
        <TextList type="amenities" form={form} setForm={setForm} />

        <DatePickerInput form={form} setForm={setForm} isError={isError} />

        <button
          onClick={submitHandler}
          type="button"
          className="bg-header-theme p-2 rounded-md text-white mt-4"
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default DashboardAddPage;
