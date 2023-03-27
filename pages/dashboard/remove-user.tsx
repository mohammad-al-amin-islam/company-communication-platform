import Dashboard from "@/components/dashboard/main-dashboard";
import RemoveUserForm from "@/components/dashboard/remove-user-form";
import React from "react";

const RemoveUser = () => {
  return (
    <>
      <Dashboard>
        <RemoveUserForm />
      </Dashboard>
    </>
  );
};

export default RemoveUser;
