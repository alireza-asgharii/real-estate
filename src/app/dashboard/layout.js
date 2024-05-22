import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'داشبورد'
}

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/auth/signin')

  if (session)
    return (
      <div className="md:flex">
        <DashboardSidebar />
        <div className="p-2 rounded-md border-2 md:w-5/6">{children}</div>
      </div>
    );
};

export default DashboardLayout;
