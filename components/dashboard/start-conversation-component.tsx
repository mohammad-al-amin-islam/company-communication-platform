import axiosCall from "@/lib/hooks/axiosCall";
import { getAllTeamsForUser } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Card from "./start-conversation-card";

const StartCoversationComponent = () => {
  const router = useRouter();

  const { data: session }: any = useSession();
  const query = getAllTeamsForUser(session?.user?.id);

  const { data } = useQuery(["allTeamsSUser", session?.user?.id], () =>
    axiosCall(session?.accessToken, query)
  );

  const handleButtonClick = (id: any) => {
    router.push(`/dashboard/start-conversation/${id}`);
  };

  console.log(data?.data?.teams);
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-10 text-3xl font-medium">All Added Teams</h1>
      {data?.data?.teams.map((team: any) => (
        <Card
          key={team.id}
          title={team.name}
          buttonText="Start Conversations"
          onButtonClick={() => handleButtonClick(team.id)}
        />
      ))}
    </div>
  );
};

export default StartCoversationComponent;
