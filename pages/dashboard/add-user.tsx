import AddUserForm from "@/components/dashboard/add-user-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import RequireAdmin from "@/lib/secured-page/require-admin";
import React from "react";

const AddUser = () => {
  return (
    <>
      <Dashboard>
        <RequireAdmin>
          <AddUserForm />
        </RequireAdmin>
      </Dashboard>
    </>
  );
};

export default AddUser;
