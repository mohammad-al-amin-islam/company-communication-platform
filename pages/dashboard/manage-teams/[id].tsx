import AddParticipantForm from "@/components/dashboard/add-participant-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import { useRouter } from "next/router";
import React from "react";

const AddParticipant = () => {
  const { query } = useRouter();
  const id = query.id;


  return (
    <>
      <Dashboard>
        <AddParticipantForm id={id}/>
      </Dashboard>
    </>
  );
};

export default AddParticipant;
