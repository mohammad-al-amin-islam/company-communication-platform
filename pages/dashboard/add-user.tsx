import AddUserForm from "@/components/dashboard/add-user-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import React from "react";

const AddUser = () => {
  return (
    <>
      <Dashboard>
        <AddUserForm />
      </Dashboard>
    </>
  );
};

export default AddUser;
