import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpPage from "@/components/templates/SignUpPage";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "پروژه املاک | ثبت نام",
  description: "2-A app",
};

const SignUp = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')
  
  
  if (!session) return <SignUpPage />;
};

export default SignUp;
