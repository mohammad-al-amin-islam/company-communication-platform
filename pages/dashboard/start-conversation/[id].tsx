import ConversationForm from "@/components/dashboard/conversation-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import React from "react";

const TeamConversation = () => {
  return (
    <div>
      <Dashboard>
        <ConversationForm/>
      </Dashboard>
    </div>
  );
};

export default TeamConversation;
