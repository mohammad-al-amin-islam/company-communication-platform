import Dashboard from "@/components/dashboard/main-dashboard";
import UserListInfo from "@/components/dashboard/user-list-info";
import RequireAdmin from "@/lib/secured-page/require-admin";
import React from "react";

const UserList = () => {
  return (
    <Dashboard>
      <RequireAdmin>
        <UserListInfo/>
      </RequireAdmin>
    </Dashboard>
  );
};

export default UserList;
