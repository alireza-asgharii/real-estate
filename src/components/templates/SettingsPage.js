import DashboardEditName from "../modules/DashboardEditName";
import DashboardForm from "../modules/DashboardForm";

const SettingsPage = ({ user }) => {
  console.log(user);
  return (
    <div className="py-3">
      {!user.name && (
        <section>
          <h5>تکمیل اطلاعات حساب</h5>
          <DashboardForm />
        </section>
      )}
      {user.name && (
        <>
          <h5 className="pb-4">تغییر اطلاعات حساب</h5>
          <DashboardEditName name={user.name} />
        </>
      )}
    </div>
  );
};

export default SettingsPage;
