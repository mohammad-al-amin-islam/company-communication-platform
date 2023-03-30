import Dashboard from "@/components/dashboard/main-dashboard";
import ManageTeamsTable from "@/components/dashboard/manage-teams-table";
import React from "react";
import RequireAdmin from "@/lib/secured-page/require-admin";

const ManageTeams = () => {
  return (
    <div>
      <Dashboard>
        <RequireAdmin>
          <ManageTeamsTable />
        </RequireAdmin>
      </Dashboard>
    </div>
  );
};

export default ManageTeams;
