import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import moment from "moment";

export const authOptions = {
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

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("حساب کاربری با این ایمیل وجود ندارد");
        }
        console.log(user);

        // AttemptFailed
        const startDate = moment(user.lastAttemptFailed);
        const endDate = moment();

        const differenceInMinutes = endDate.diff(startDate, "minutes");
        if (!!user.lastAttemptFailed && differenceInMinutes > 3)
          user.lastAttemptFailedNumber = 0;
        await user.save();
        if (
          !!user.lastAttemptFailed &&
          differenceInMinutes < 3 &&
          !!user.lastAttemptFailedNumber &&
          user.lastAttemptFailedNumber > 5
        )
          throw new Error(
            "درخواست های ورود بیش از حد بود. لطفا بعدا امتحان کنید."
          );

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          user.lastAttemptFailed = Date.now();
          user.lastAttemptFailedNumber =
            (user.lastAttemptFailedNumber ?? 1) + 1;
          await user.save();
          throw new Error("رمز عبور اشتباه است");
        }

        return { email: user.email, id: user._id };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
