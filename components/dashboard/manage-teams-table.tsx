import axiosCall from "@/lib/hooks/axiosCall";
import { allTeamsQueryById, removeTeams } from "@/lib/query/hasuraQueries";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../shared/loading";

const ManageTeamsTable = () => {
  const { data: session }: any = useSession();
  const token = session?.accessToken;
  const adminID = session?.user?.id;
  const query = allTeamsQueryById(adminID);

  const { data, isLoading } = useQuery(["allgroups", query], () =>
    axiosCall(token, query)
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteTeamsBtn = async (id: any) => {
    const query = removeTeams(id);

    const data = await axiosCall(token, query);
    if (data.data.delete_teams_by_pk.name) {
      alert("Team deleted successfully");
    }
  };
  console.log(data);

  return (
    <div>
      <h1 className="text-center text-3xl my-5 font-medium">
        Manage Teams Here
      </h1>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Creating time</th>
            <th className="py-3 px-6 text-left">Add Teams Participant</th>
            <th className="py-3 px-6 text-left">Delete Teams?</th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-sm font-light">
          {data.data.teams.length == 0 ? (
            <p className="py-3 px-6 text-left">No Teams Created Yet</p>
          ) : (
            " "
          )}
          {data?.data?.teams?.map((user: any) => (
            <tr
              key={user.created_at}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {user.name}
              </td>
              <td className="py-3 px-6 text-left">{user.created_at}</td>
              <td className="py-3 px-6 text-left">
                <Link
                  href={`/dashboard/manage-teams/${user.id}`}
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Click here
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => handleDeleteTeamsBtn(user.id)}
                  className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Click here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeamsTable;
