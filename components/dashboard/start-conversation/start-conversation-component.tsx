import axiosCall from "@/lib/hooks/axiosCall";
import { getAllTeamsForUser } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../shared/loading";
import Card from "./start-conversation-card";

const StartCoversationComponent = () => {
  const router = useRouter();

  const { data: session }: any = useSession();
  const query = getAllTeamsForUser(session?.user?.id);

  const { data, isLoading } = useQuery(
    ["allTeamsSUser", session?.user?.id],
    () => axiosCall(session?.accessToken, query)
  );
  // console.log(data);

  const handleButtonClick = (id: any) => {
    router.push(`/dashboard/start-conversation/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="my-10 text-3xl font-medium"></h1> */}
      <h1 className="my-5 text-3xl font-medium  border-2 border-b-green-500 border-spacing-y-5 p-3">
        All Teams Conversation
      </h1>
      {data?.data?.teams.length == 0 ? (
        <p className="py-3 px-6 text-left">
          No conversation created or added by
        </p>
      ) : (
        " "
      )}
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
