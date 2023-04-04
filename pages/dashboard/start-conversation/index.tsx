import Dashboard from "@/components/dashboard/main-dashboard";
import StartCoversationComponent from "@/components/dashboard/start-conversation/start-conversation-component";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import React from "react";

const StartConverstion = () => {
  return (
    <>
      <Dashboard>
        <PotectedSessionRoute>
          <StartCoversationComponent></StartCoversationComponent>
        </PotectedSessionRoute>
      </Dashboard>
    </>
  );
};

export default StartConverstion;
