import EditUserForm from "@/components/dashboard/edit-user/edit-user-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import RequireAdmin from "@/lib/secured-page/require-admin";
import React from "react";

const EditUser = () => {
  return (
    <>
      <Dashboard>
        <RequireAdmin>
          <EditUserForm></EditUserForm>
        </RequireAdmin>
      </Dashboard>
    </>
  );
};

export default EditUser;
