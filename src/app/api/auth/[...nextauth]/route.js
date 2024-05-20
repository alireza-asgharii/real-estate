import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import moment from "moment";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connectDB();
        } catch (error) {
          console.log(error.message);
          throw new Error("مشکلی در سرور رخ داده است");
        }

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("لطفا اطلاعات معتبر وارد کنید");
        }

        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("حساب کاربری با این ایمیل وجود ندارد");
          }

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) {
            user.lastAttemptFailed = Date.now();
            await user.save();
            throw new Error("رمز عبور اشتباه است");
          }

          const startDate = moment(user.lastAttemptFailed);
          const endDate = moment();
          const differenceInMinutes = endDate.diff(startDate, "minutes");

          if (differenceInMinutes < 5)
            throw new Error(
              "درخواست های ورود بیش از حد بود. لطفا بعدا امتحان کنید."
            );

          return { email: user.email };
        } catch (error) {
          throw new Error("مشکلی در سرور رخ داد");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
