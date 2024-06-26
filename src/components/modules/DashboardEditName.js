"use client"
import { useState } from "react";
import DashboardForm from "./DashboardForm";

const DashboardEditName = ({name}) => {
  const [isEdit, setEdit] = useState(false)
  return (
    <div className="py-2">
      <button onClick={() => setEdit(!isEdit)} className="border-2 rounded-md px-2 py-1">ویرایش نام</button>
      {isEdit && (
        <>
          <DashboardForm name={name} />
        </>
      )}
    </div>
  );
};

export default DashboardEditName;