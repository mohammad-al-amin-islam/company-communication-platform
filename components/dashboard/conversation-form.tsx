import axiosCall from "@/lib/hooks/axiosCall";
import { getAllMessage, getSendMessageQuery } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../shared/loading";

interface IMessage {
  id: number;
  text: string;
  sender: string;
  time: string;
}

const ConversationForm = () => {

  const messageValueRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();
  const { query } = useRouter();
 
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageValueRef.current?.value;
    const userId = session?.user?.id;
    const teamId = query.id;

    console.log(message, userId, teamId);

    const insertQuery = getSendMessageQuery(message, teamId, userId);

    const data = await axiosCall(session?.accessToken, insertQuery);

    console.log(data.data.insert_messages_one);

    if (data.data.insert_messages_one) {
      formRef.current?.reset();
    }
  };

  //for deleting messages
  const handleDeleteMessage = (id: number) => {
    // setMessages(messages.filter((message) => message.id !== id));
  };


  const allMessagesQuery = getAllMessage;

  const {data,refetch,isLoading} = useQuery("allMessages",()=>axiosCall(session?.accessToken,allMessagesQuery))

  if(isLoading){
    return <Loading/>
  }
  console.log(data)
  if(data.data.messages){
    refetch()
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {data.data.messages.map((message:any) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id == session?.user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`bg-gray-200 px-4 py-2 rounded-lg max-w-xs ${
                    message.user_id == session?.user?.id ? "ml-4" : "mr-4"
                }`}
              >
                <p className="text-gray-700">{message.content}</p>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">{message.created_at}</span>
                  {message.user_id == session?.user?.id && (
                    <button
                      className="text-gray-500 hover:text-gray-700"
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
