import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInPage from "@/components/templates/SignInPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  if (!session) return <SignInPage />;
};

export default SignIn;
