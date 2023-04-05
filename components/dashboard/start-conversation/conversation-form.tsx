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
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Loading from "../../shared/loading";
import EditButton from "./edit-message-btn";
// import { AiOutlineTeam } from "react-icons/ai";
// import { AiOutlineSend } from "react-icons/ai";
const ConversationForm = () => {
  const messageValueRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { data: session }: any = useSession();
  const { query } = useRouter();
  const teamInfoQuery = getTeamInfo(query.id);

  const { data: teamData, isLoading: tLoading } = useQuery("allTeams", () =>
    axiosCall(session?.accessToken, teamInfoQuery)
  );

  //all messages
  const allMessagesQuery = getSpecificTeamMessage(query.id);
  const { data, refetch, isLoading } = useQuery("allMessages", () =>
    axiosCall(session?.accessToken, allMessagesQuery)
  );
  console.log(data);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [data]);

  //edit message
  const [value, setValue] = useState(" ");
  const handleSave = (newValue: string) => {
    setValue(newValue);
  };

  const inserTedQuery = sentMessageUsingMutation;

  //sending data using Mutation
  const {
    mutate,
    isLoading: mLoading,
    data: insertedData,
  }: any = useMutation(
    async (input: any) => {
      const token = `${session.accessToken}`;
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(
        process.env.hasuraApi as string,
        {
          query: inserTedQuery,
          variables: {
            content: input.message,
            team_id: input.teamId,
            user_id: input.userId,
          },
        },
        { headers }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log("Message sent");
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
    console.log(insertedData);

    if (insertedData?.data.insert_messages_one) {
      formRef.current?.reset();
      refetch();
    }
  };

  //for deleting messages
  const handleDeleteMessage = async (id: number) => {
    const deleteQuery = deleteMessegeQuery(id);
    const data = await axiosCall(session.accessToken, deleteQuery);
    console.log(data);
    refetch();
  };

  const handleEditMessageBtn = async (id: number) => {
    console.log(id);
  };

  if (isLoading || tLoading) {
    return <Loading />;
  }
  // console.log(data);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b-2 mx-2">
        <h1 className="text-lg font-semibold flex">
          {/* <AiOutlineTeam className="text-2xl "/> */}
          {teamData.data.teams_by_pk.name}
        </h1>
        <p className="text-sm">Total members: {teamData.data.teams_by_pk.team_members.length}</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
        {
          data.data.messages.length == 0 && <p className="text-sm mt-10 text-center">Converstation is not started yet</p>
        }
        <div className="flex flex-col space-y-4">
          {data.data.messages.sort((a:any, b:any) => a.id - b.id).map((message: any) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id == session?.user?.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* <span className="text-xs text-gray-500 mr-1">
                {message.user.name.split(" ")[0]}
              </span> */}
              <div
                className={`bg-gray-200 px-4 py-2 rounded-lg max-w-xs ${
                  message.user_id == session?.user?.id ? "ml-4" : "mr-4"
                }`}
              >
                <span className="text-xs text-green-900">
                  {message.user.name.split(" ")[0]}
                </span>
                <p className="text-gray-700">{message.content}</p>

                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleString().slice(9)}
                  </span>
                  {/* {message.user_id == session?.user?.id && ( */}
                  <button
                    className="text-gray-500 hover:text-gray-700 ml-2"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    Delete
                  </button>
                  {/* )} */}

                  <EditButton
                    initialValue={value}
                    onSave={handleSave}
                    Id={message.id}
                    refetch={refetch}
                  />
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
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white"
            >
              {/* <AiOutlineSend className="text-lg"/> */}
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationForm;
