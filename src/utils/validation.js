export const formValidation = (form, type) => {
  const error = {};
  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  const passwordRegx = /([A-Za-z0-9#?!@$%^&*-])([^ ]){5,}$/g;

  const { email, password } = form;

  if (email.trim() === "") {
    error.email = "لطفا ایمیل را وارد کنید.";
  } else if (!emailRegx.test(email)) {
    error.email = "لطفا یک ایمیل معتبر وارد کنید";
  } else {
    delete error.email;
  }

  if (password.trim() === "") {
    error.password = "لطفا رمزعبور را وارد کنید.";
  } else if (!passwordRegx.test(password)) {
    error.password =
      " رمز عبور فقط میتواند شامل حروف انگلیسی و اعداد و کاراکتر های مجاز و حداقل طول 6 حرف باشد ";
  } else {
    delete error.password;
  }

  if (type === "signup") {
    if (form.rePassword.trim() === "") {
      error.rePassword = "رمز عبور را تایید کنید";
    } else if (password !== form.rePassword) {
      error.rePassword = "رمز عبور ها مطابقت ندارند";
    } else {
      delete error.rePassword;
    }
  }

  return error;
};

export const adFormValidation = (form) => {
  const error = {};
  const phoneRegx = /^(\+98|0)?9\d{9}$/g
  ;
  const {
    title,
    description,
    location,
    phone,
    price,
    realState,
    constructionDate,
    category
  } = form;

  if (title.trim().length === 0) {
    error.title= 'عنوان آگهی خود را وارد کنید'
  } else {
    delete error.title
  }

  if (description.trim().length === 0) {
    error.description= 'توضیحات آگهی خود را وارد کنید'
  } else {
    delete error.description
  }

  if (location.trim().length === 0) {
    error.location= 'محل ملک خود را وارد کنید'
  } else {
    delete error.location
  }

  if (phone.trim().length === 0) {
    error.phone= 'شماره تماس خود را وارد کنید'
  } if (!phoneRegx.test(phone)) {
    error.phone= 'شماره تماس معتبر وارد کنید'
  } else {
    delete error.phone
  }

  if (price.trim().length === 0) {
    error.price= 'قیمت ملک خود را وارد کنید'
  } else {
    delete error.price
  }

  if (realState.trim().length === 0) {
    error.realState= 'بنگاهی که درآن املاک شما ثبت است را وارد کنید'
  } else {
    delete error.realState
  }

  if (!constructionDate) {
    error.constructionDate= 'سال ساخت ملک خود را وارد کنید'
  } else {
    delete error.constructionDate
  }

  if (!category) {
    error.category= 'دسته بندی ملک خود را انتخاب کنید'
  } else {
    delete error.category
  }


  return error;
};
