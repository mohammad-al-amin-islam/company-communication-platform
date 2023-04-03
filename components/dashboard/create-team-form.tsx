import axiosCall from "@/lib/hooks/axiosCall";
import {
  addTeamsMembers,
  allTeamsQueryById,
  createTeams,
} from "@/lib/query/hasuraQueries";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import Loading from "../shared/loading";

const CreateTeamForm = () => {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();
  const adminID = session?.user?.id;
  const token = session?.accessToken;

  const query2 = allTeamsQueryById(adminID);

  const { data, isLoading, refetch } = useQuery(["allgroups", adminID], () =>
    axiosCall(token, query2)
  );

  const inserTedQuery = `mutation MyMutation($admin_id: Int = 10, $name: String = "", $user_id: Int = 10) {
    insert_teams(objects: {admin_id: $admin_id, name: $name, team_members: {data: {user_id: $user_id}}}) {
      returning {
        name
        team_members {
          team_id
        }
      }
    }
  }`;

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
            admin_id: input.adminID,
            name: input.teamName,
            user_id: input.userId,
          },
        },
        { headers }
      );
      return data;
    },
    {
      onSuccess: async (data) => {
        console.log(data);
        alert("Team created successfully");
        refetch();
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const teamName = teamNameRef.current?.value;

    // const query = createTeams(teamName, adminID);

    // try {
    //   const res = await axiosCall(token, query);
    //   if (res.data?.insert_teams.affected_rows) {
    //     formRef.current?.reset();
    //     alert("Teams created successfully");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    const userId = session.user.id;
    await mutate({ adminID, teamName, userId });
    if (mLoading) {
      return <Loading />;
    }
    formRef.current?.reset();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Create Teams Here</h1>
      <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
        <div>
          <label
            htmlFor="teamName"
            className="block text-gray-700 font-bold mb-2"
          >
            Give A Team Name:
          </label>
          <input
            id="teamName"
            type="text"
            ref={teamNameRef}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded text-center"
          >
            Create Team
          </button>
        </div>
      </form>
      <h2 className="text-xl font-bold mt-8 mb-4">All teams</h2>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Creating time</th>
            {/* <th className="py-3 px-6 text-left">Email</th> */}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data?.data?.teams?.map((user: any) => (
            <tr
              key={user.created_at}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {user.name}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(user.created_at).toLocaleString()}
              </td>
              {/* <td className="py-3 px-6 text-left">{user.email}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateTeamForm;
