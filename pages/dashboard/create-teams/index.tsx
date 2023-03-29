import CreateTeamForm from "@/components/dashboard/create-team-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import RequireAdmin from "@/lib/secured-page/require-admin";
import React from "react";

const CreateTeams = () => {
  return (
    <>
      <Dashboard>
        <RequireAdmin>
          <CreateTeamForm />
        </RequireAdmin>
      </Dashboard>
    </>
  );
};

export default CreateTeams;
