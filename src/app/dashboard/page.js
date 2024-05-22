import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/templates/DashboardPage";

const dashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  if (session) return <DashboardPage />;
};

export default dashboardPage;
