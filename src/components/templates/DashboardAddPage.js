"use client";

import { useEffect, useState, useTransition } from "react";
import TextInput from "../modules/TextInput";
import { p2e } from "@/utils/numberFormat";
import RadioList from "../modules/RadioList";
import TextList from "../modules/TextList";
import DatePickerInput from "../modules/DatePickerInput";
import toast from "react-hot-toast";
import { useCreateAd } from "@/hooks/useMutation";
import { useRouter } from "next/navigation";
import { adFormValidation } from "@/utils/validation";
import { editAd } from "@/actions/dashboardActions";
import Spiner from "../modules/Spiner";
import { revalidate } from "@/actions/actions";

const DashboardAddPage = ({ ad }) => {
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

  useEffect(() => {
    if (ad) setForm(ad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isError, setError] = useState(adFormValidation(form));
  const { mutate, isPending, error, data } = useCreateAd();
  // console.log({ mutate, isPending, error, data });

  //action loading
  const [editPending, startTransiotion] = useTransition();

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
        revalidate("/dashboard/my-ads");
        router.push("/dashboard/my-ads");
      },
      onError: (e) => toast.error(e.response.data.error),
    });
  };

  const editHandler = () => {
    if (Object.keys(isError).length !== 0) {
      toast.error(Object.values(isError)[0]);
      return;
    }
    startTransiotion(async () => {
      const res = await editAd(form);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      router.push("/dashboard/my-ads");
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
          disabled={isPending || editPending}
          onClick={ad ? editHandler : submitHandler}
          type="button"
          className="bg-header-theme p-2 rounded-md text-white mt-4 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <span className="pl-2">{ad ? "بروزرسانی آگهی" : "ثبت آگهی"}</span>
          {(isPending || editPending) && (
            <Spiner w="w-4" h="h-4" border="border-2" />
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardAddPage;
