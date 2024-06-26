import SettingsPage from "@/components/templates/SettingsPage";
import { getUserdetails } from "@/utils/cachedData";

const Setting = async () => {
  const user = await getUserdetails();
  if (user) return <SettingsPage user={user} />;
};

export default Setting;
