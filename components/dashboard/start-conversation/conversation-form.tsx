import axiosCall from "@/lib/hooks/axiosCall";
import {
  deleteMessegeQuery,
  getAllMessage,
  getSendMessageQuery,
  getSpecificTeamMessage,
  getSpecificTeamMessageSubsCription,
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
import { AiFillDelete, AiOutlineTeam } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

import { createClient } from "graphql-ws";

const ConversationForm = () => {
  const messageValueRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);
  const [isLoadings, setLoading] = useState(true);

  const { data: session }: any = useSession();
  const { query } = useRouter();
  const teamInfoQuery = getTeamInfo(query.id);

  const { data: teamData, isLoading: tLoading } = useQuery("allTeams", () =>
    axiosCall(session?.accessToken, teamInfoQuery)
  );

  //all messages

  //using subbscriptions

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
    };
    const client = createClient({
      url: "wss://easy-reptile-22.hasura.app/v1/graphql",
      connectionParams: {
        headers,
      },
    });

    const subscriptionQuery = getSpecificTeamMessageSubsCription(query.id);

    const onNext = (data: any) => {
      // console.log("Received data:", data);
      setMessages(data?.data?.messages);
      setLoading(false);
    };

    const onError = (error: any) => {
      console.error("Subscription error:", error);
    };

    const onComplete = () => {
      console.log("Subscription completed");
    };

    const sink = { next: onNext, error: onError, complete: onComplete };

    const payload = subscriptionQuery;

    const result = client.subscribe(payload, sink);

    // console.log(result);
  }, [query?.id, session?.accessToken]);

  // console.log(messages);

  // using only react query

  // const allMessagesQuery = getSpecificTeamMessage(query.id);
  // const { data, refetch, isLoading } = useQuery("allMessages", () =>
  //   axiosCall(session?.accessToken, allMessagesQuery)
  // );
  // // console.log(data);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        // console.log("Message sent");
        // refetch();
      },
    }
  );

  // console.log(data)

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageValueRef.current?.value;
    const userId = session?.user?.id;
    const teamId = query.id;

    // console.log(message, userId, teamId);

    // const insertQuery = getSendMessageQuery(message, teamId, userId);
    // const data = await axiosCall(session?.accessToken, insertQuery);

    await mutate({ message, userId, teamId });
    formRef.current?.reset();
    // console.log(insertedData);

    if (insertedData?.data.insert_messages_one) {
      formRef.current?.reset();
      // refetch();
    }
  };

  //for deleting messages
  const handleDeleteMessage = async (id: number) => {
    const deleteQuery = deleteMessegeQuery(id);
    const data = await axiosCall(session.accessToken, deleteQuery);
    // console.log(data);
    // refetch();
  };

  const handleEditMessageBtn = async (id: number) => {
    console.log(id);
  };

  if (isLoadings || tLoading) {
    return <Loading />;
  }
  // console.log(data);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b-2 mx-2">
        <h1 className="text-lg font-semibold flex">
          <AiOutlineTeam className="text-2xl " />
          {teamData?.data?.teams_by_pk.name}
        </h1>
        <p className="text-sm">
          Total members: {teamData?.data?.teams_by_pk?.team_members.length}
        </p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
        {messages?.length == 0 && (
          <p className="text-sm mt-10 text-center">
            Converstation is not started yet
          </p>
        )}
        <div className="flex flex-col space-y-4">
          {messages
            ?.sort((a: any, b: any) => a.id - b.id)
            .map((message: any) => (
              <div
                key={message.id}
                className={`flex ${
                  message.user_id == session?.user?.id
                    ? "justify-start flex-row-reverse"
                    : "justify-start"
                }`}
              >
                <span className="text-xs text-gray-500">
                  <h1 className="bg-red-200 p-3 rounded-full">
                    {message.user.name.slice(0, 1)}
                  </h1>
                </span>

                <div
                  className={` px-4 py-2 rounded-lg max-w-xs ${
                    message.user_id == session?.user?.id
                      ? "bg-blue-500 ml-4 mr-2"
                      : "bg-gray-500 mr-4 ml-2"
                  }`}
                >
                  {/* <span className="text-xs text-green-900">
                    {message.user.name.split(" ")[0]}
                  </span> */}
                  <p className="text-white">{message.content}</p>

                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white">
                      {new Date(message.created_at).toLocaleString().slice(10)}
                    </span>
                    {/* {message.user_id == session?.user?.id && ( */}
                    <div>
                      <button
                        className="text-white hover:text-yellow-500 ml-2"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <AiFillDelete />
                      </button>
                      {/* )} */}

                      {message.user_id == session?.user?.id && (
                        <EditButton
                          initialValue={value}
                          onSave={handleSave}
                          Id={message.id}
                          // refetch={refetch}
                        />
                      )}
                    </div>
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
              <AiOutlineSend className="text-lg" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConversationForm;
