import axiosCall from "@/lib/hooks/axiosCall";
import {
  deleteMessegeQuery,
  getAllMessage,
  getSendMessageQuery,
  getSpecificTeamMessage,
  getTeamInfo,
  sentMessageUsingMutation,
} from "@/lib/query/hasuraQueries";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Loading from "../shared/loading";

const ConversationForm = () => {
  const messageValueRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();
  const { query } = useRouter();
  const teamInfoQuery = getTeamInfo(query.id);

  const { data: teamData,isLoading:tLoading } = useQuery("allTeams", () =>
    axiosCall(session?.accessToken, teamInfoQuery)
  );


  //all messages
  const allMessagesQuery = getSpecificTeamMessage(query.id);
  const { data, refetch, isLoading } = useQuery("allMessages", () =>
    axiosCall(session?.accessToken, allMessagesQuery)
  );


  const inserTedQuery = sentMessageUsingMutation;

  //sending data using Mutation
  const {mutate,  isLoading:mLoading,data:insertedData }:any = useMutation(
    async (input: any) => {
      const token = `${session.accessToken}`;
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(process.env.hasuraApi as string, {
        query: inserTedQuery,
        variables: { content:input.message,team_id:input.teamId ,user_id:input.userId},
      }, { headers });
      return data;
    },
    {
      onSuccess: (data) => {
        console.log('Message sent');
        refetch();
      },
    }
  );

  
  // console.log(data)

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageValueRef.current?.value;
    const userId = session?.user?.id;
    const teamId = query.id;

    console.log(message, userId, teamId);

    // const insertQuery = getSendMessageQuery(message, teamId, userId);
    // const data = await axiosCall(session?.accessToken, insertQuery);

    await mutate({ message, userId, teamId });
    formRef.current?.reset();
    console.log(insertedData)

    if (insertedData?.data.insert_messages_one) {
      formRef.current?.reset();
      refetch();
    }
  };

  //for deleting messages
  const handleDeleteMessage = async (id: number) => {
    console.log(id);
    const deleteQuery = deleteMessegeQuery(id);
    const data = await axiosCall(session.accessToken, deleteQuery);
    console.log(data);
    refetch();
  };

  if (isLoading || tLoading) {
    return <Loading />;
  }
  // console.log(data);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b-2">
        <h1 className="text-lg font-semibold">{teamData.data.teams_by_pk.name}</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {data.data.messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id == session?.user?.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <span className="text-xs text-gray-500 mr-1">
                {message.user.name.split(" ")[0]}
              </span>
              <div
                className={`bg-gray-200 px-4 py-2 rounded-lg max-w-xs ${
                  message.user_id == session?.user?.id ? "ml-4" : "mr-4"
                }`}
              >
                <p className="text-gray-700">{message.content}</p>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    {message.created_at.split(":")[0]}
                  </span>
                  {message.user_id == session?.user?.id && (
                    <button
                      className="text-gray-500 hover:text-gray-700 ml-2"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t-2">
        <form onSubmit={handleSendMessage} ref={formRef}>
          <div className="flex">
            <input
              type="text"
              className="flex-1 bg-slate-200 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              ref={messageValueRef}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationForm;
