import axiosCall from "@/lib/hooks/axiosCall";
import { allTeamsQuery, createTeams } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useQuery } from "react-query";

const CreateTeamForm = () => {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();
  const adminID = session?.user?.id;
  const token = session?.accessToken;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const teamName = teamNameRef.current?.value;

    const query = createTeams(teamName, adminID);

    try {
      const res = await axiosCall(token, query);
      if (res.data?.insert_teams.affected_rows) {
        formRef.current?.reset();
        alert("Teams created successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const query2 = allTeamsQuery;

  const { data, isLoading } = useQuery(["allgroups", query2], () =>
    axiosCall(token, query2)
  );
//   console.log(data)

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
              <td className="py-3 px-6 text-left">{user.created_at}</td>
              {/* <td className="py-3 px-6 text-left">{user.email}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateTeamForm;
