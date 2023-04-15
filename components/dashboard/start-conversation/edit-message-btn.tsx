import axiosCall from "@/lib/hooks/axiosCall";
import { editMessegeQuery } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

type Props = {
  initialValue: string;
  onSave: (value: string) => void;
  Id: any;
  // refetch: any;
};

const EditButton = ({ initialValue, onSave, Id}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(value);
    // console.log(value, Id);

    //query for editing the message
    const query = {
      query: `mutation MyMutation($id: Int = 10, $content: String = "") {
            update_messages_by_pk(pk_columns: {id: $id}, _set: {content: $content}) {
              content
            }
          }`,
      variables: {
        id: Id,
        content: value,
      },
    };

    // const query = editMessegeQuery(Id, value);
    const { data } = await axiosCall(session?.accessToken, query);
    if (data?.update_messages_by_pk) {
      // refetch();
      formRef.current?.reset();
      setValue("");
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white hover:text-black ml-2"
      >
        <AiFillEdit />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 mx-2">
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="value"
                >
                  Enter Message:
                </label>
                <input
                  type="text"
                  id="value"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;
