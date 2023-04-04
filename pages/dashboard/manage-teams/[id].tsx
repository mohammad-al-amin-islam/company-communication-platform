import AddParticipantForm from "@/components/dashboard/manage-teams/add-participant-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import RequireAdmin from "@/lib/secured-page/require-admin";
import { useRouter } from "next/router";
import React from "react";

const AddParticipant = () => {
  const { query } = useRouter();
  const id = query.id;

  return (
    <>
      <Dashboard>
        <RequireAdmin>
          <AddParticipantForm id={id} />
        </RequireAdmin>
      </Dashboard>
    </>
  );
};

export default AddParticipant;
