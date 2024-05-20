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
