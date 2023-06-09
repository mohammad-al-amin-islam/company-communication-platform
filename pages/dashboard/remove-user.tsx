import Dashboard from "@/components/dashboard/main-dashboard";
import RemoveUserForm from "@/components/dashboard/remove-user-form";
import RequireAdmin from "@/lib/secured-page/require-admin";
import React from "react";

const RemoveUser = () => {
  return (
    <>
      <Dashboard>
        <RequireAdmin>
          <RemoveUserForm />
        </RequireAdmin>
      </Dashboard>
    </>
  );
};

export default RemoveUser;
