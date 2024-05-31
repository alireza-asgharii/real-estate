import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserdetails } from "@/utils/cachedData";
import { Suspense } from "react";
import Loader from "@/components/modules/Loader";

export const metadata = {
  title: 'داشبورد'
}

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  const user = await getUserdetails();

  if (session)
    return (
      <div className="md:flex">
        <DashboardSidebar role={user.role} />
        <Suspense fallback={<Loader />}>
          <div className="p-2 rounded-md border-2 md:w-5/6">{children}</div>
        </Suspense>
      </div>
    );
};

export default DashboardLayout;
