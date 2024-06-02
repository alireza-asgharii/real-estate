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
import Image from "next/image";
import supabase from "@/lib/supabase";
import { IoIosCloudDone } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

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
    images: [],
  });
  const [filesURL, setFilesURL] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  useEffect(() => {
    if (ad) setForm(ad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isError, setError] = useState(adFormValidation(form));
  const { mutate, isPending, error, data } = useCreateAd();
  // console.log({ mutate, isPending, error, data });

  //action loading
  const [editPending, startTransiotion] = useTransition();

  const [uploadPending, startUpload] = useTransition();

  const router = useRouter();

  const changehandler = async (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      const files = e.target.files;
      if (filesURL.length > 4) {
        toast.error("حداکثر میتوانید 4 تصویر را اپلود کنید");
        return;
      }

      if (files.length > 4) {
        toast.error("حداکثر میتوانید 4 تصویر را اپلود کنید");
      }

      Array.from(files, (item, index) => {
        if (index <= 3 && imagesList.length <= 4) return item;
      }).forEach((file) => {
        console.log(file);
        if (!file) return;
        setImagesList((prev) => [...prev, file?.name ?? "بدون نام"]);
        const localImageUrl = URL.createObjectURL(file);
        setFilesURL((prev) => [...prev, localImageUrl]);
        startUpload(async () => {
          const { data, error } = await supabase.storage
            .from("images2")
            .upload(
              `images/${Math.floor(Math.random() * 10)}-${Date.now()}.png`,
              file,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );
          console.log({ data, error });
          setForm({ ...form, images: [...form.images, data.path] });
        });
      });

      return;
    }
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
          images: [],
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

  const deleteImages = (index) => {
    const fileList = [...filesURL];
    fileList.splice(index, 1);
    setFilesURL(fileList);

    const imgList = [...imagesList];
    imgList.splice(index, 1);
    setImagesList(imgList);
  };

  return (
    <div className="text-sm">
      <form className="md:w-1/3 flex flex-col ">
        <div className="py-3 flex gap-1 ">
          {filesURL.map((item, index) => (
            <div className="relative w-fit" key={index}>
              <span
                onClick={() => deleteImages(index)}
                className="absolute top-1 left-1 text-red-500 md:cursor-pointer"
              >
                <MdDeleteOutline />
              </span>
              {uploadPending && (
                <span className="inline-block absolute top-1/2 pt-2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <Spiner w="w-4" h="h-4" border="border-[3px]" />
                </span>
              )}
              {!uploadPending && (
                <span className="text-white inline-block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <IoIosCloudDone />
                </span>
              )}
              <Image
                className={`w-16 h-16 rounded-md`}
                src={item}
                width={300}
                height={300}
                alt="image"
              />
            </div>
          ))}
        </div>
        <label className="group overflow-hidden border-2 p-2 rounded-md flex items-center md:cursor-pointer">
          <input
            type="file"
            multiple
            name="images"
            onChange={changehandler}
            className="hidden"
          />
          <span className="group-hover:bg-slate-950 text-sm group-hover:text-white transition-colors  rounded-md p-1 ml-3">
            انتخاب فایل
          </span>
          <p className="text-xs flex overflow-hidden w-4/6">
            {!imagesList.length && <span>هیچ فایلی انتخاب نشده است</span>}
            {imagesList.map((item, index) => (
              <span key={index} className="px-1 min-w-fit">
                {item}
              </span>
            ))}
          </p>
        </label>

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
