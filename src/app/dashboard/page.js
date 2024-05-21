import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const dashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  if (session) return <div>dashboard</div>;
};

export default dashboardPage;
