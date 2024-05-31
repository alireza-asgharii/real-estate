import AdminPage from "@/components/templates/AdminPage";
import { getUserdetails } from "@/utils/cachedData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "پنل ادمین",
};

const Admin = async () => {
  const user = await getUserdetails();

  if (user.role !== "ADMIN") redirect("/dashboard");
  return <AdminPage />;
};

export default Admin;
