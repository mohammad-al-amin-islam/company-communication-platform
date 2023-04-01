import ConversationForm from "@/components/dashboard/conversation-form";
import Dashboard from "@/components/dashboard/main-dashboard";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import React from "react";

const TeamConversation = () => {
  return (
    <div>
      <Dashboard>
        <PotectedSessionRoute>
          <ConversationForm />
        </PotectedSessionRoute>
      </Dashboard>
    </div>
  );
};

export default TeamConversation;
