import Dashboard from "@/components/dashboard/main-dashboard";
import React from "react";
import RequireAdmin from "@/lib/secured-page/require-admin";
import ManageTeamsTable from "@/components/dashboard/manage-teams/manage-teams-table";

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
