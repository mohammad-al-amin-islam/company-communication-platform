import { getUpdateInformationQuery } from "@/lib/query/hasuraQueries";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useMutation } from "react-query";

const UpdateUserInfo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();

  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const updatedQuery = getUpdateInformationQuery;

  const {
    mutate,
    isLoading: mLoading,
    data,
  }: any = useMutation(
    async (input: any) => {
      const token = `${session.accessToken}`;
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(
        process.env.hasuraApi as string,
        {
          query: updatedQuery,
          variables: {
            id: input.id,
            name: input.name,
            password: input.password,
          },
        },
        { headers }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        alert("Information updated successfully");
        formRef.current?.reset();
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = session.user.id;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;

    await mutate({ id, name, password });
    if (data?.data?.update_users_by_pk) {
      //   alert("Information updated successfully");
      //   formRef.current?.reset();
    }
  };

  return (
    <PotectedSessionRoute>
      <div className="bg-gray-200 pb-20">
        <div className="flex flex-col items-center">
          <h1 className="my-5 text-3xl font-medium  border-2 border-b-green-500 border-spacing-y-5 p-3">
            Update Your Information here
          </h1>
          <form
            className="flex flex-col w-2/4 shadow-lg p-7 bg-white rounded-lg"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div>
              <label htmlFor="input" className="mb-2">
                Your email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={session?.user?.email}
                disabled
                className="w-full p-2 mb-4 rounded-md shadow-md"
              />
            </div>
            <div>
              <label htmlFor="input" className="mb-2">
                Give Update Name:
              </label>
              <input
                type="text"
                name="Name"
                id="name"
                ref={nameRef}
                className="w-full p-2 mb-4 rounded-md shadow-md"
                // value={user.name}
                // disabled
                required
              />
            </div>

            <div>
              <label htmlFor="input" className="mb-2">
                Set a new password:
              </label>
              <input
                type="password"
                name="password"
                id="input"
                ref={passwordRef}
                className="w-full p-2 mb-4 rounded-md shadow-md"
                required
              />
            </div>

            {mLoading ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Submiting...
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </PotectedSessionRoute>
  );
};

export default UpdateUserInfo;
