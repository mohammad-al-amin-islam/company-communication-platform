import Dashboard from "@/components/dashboard/main-dashboard";
import ManageTeamsTable from "@/components/dashboard/manage-teams-table";
import React from "react";

const ManageTeams = () => {
  return (
    <div>
      <Dashboard>
        <ManageTeamsTable />
      </Dashboard>
    </div>
  );
};

export default ManageTeams;
