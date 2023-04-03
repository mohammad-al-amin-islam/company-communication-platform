import axiosCall from "@/lib/hooks/axiosCall";
import {
  addTeamsMembers,
  allPerticipantInfo,
  allUserInfo,
  deleteTeamsMembers,
} from "@/lib/query/hasuraQueries";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { useQuery } from "react-query";
import Loading from "../shared/loading";

const AddParticipantForm = ({ id }: any) => {
  const selectedOptionRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session }: any = useSession();
  const query = allUserInfo;

  //get user information
  const { data, isLoading } = useQuery(["allgroups", query], () =>
    axiosCall(session?.accessToken, query)
  );

  //ger teams participant information
  const teamsQuery = allPerticipantInfo(id);
  const { data: teamMembers } = useQuery(
    ["allParticioant", allPerticipantInfo],
    () => axiosCall(session?.accessToken, teamsQuery)
  );
  console.log(teamMembers);
  // console.log(teamMembers.data.team_members);
  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const teamId = id;
    const userId = selectedOptionRef.current?.value ?? "";
    console.log(userId);

    const addedMemeber = teamMembers.data.team_members.find(
      (teamMember: any) => teamMember.user.id == userId
    );
    if (addedMemeber) {
      alert("Already in the team");
      return;
    }
    console.log(addedMemeber);

    const query2 = addTeamsMembers(teamId, userId);

    const res = await axiosCall(session?.accessToken, query2);
    if (res.data.insert_team_members_one) {
      alert("User added to the team successfully");
    }
  };

  const handleDeleteTParticipantBtn = async (id: any) => {
    // const query = removeTeams(id);
    const query = deleteTeamsMembers(id);

    console.log(id);

    const data = await axiosCall(session?.accessToken, query);
    console.log(data);
    if (data.data.delete_team_members_by_pk.id) {
      alert("Participant deleted successfully");
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-3xl font-medium">Add Participant Here</h1>
      <form
        className="flex flex-col w-2/4 shadow-lg p-7"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <label htmlFor="options" className="mb-2">
          Select Participant Name:
        </label>
        <select
          name="options"
          id="options"
          ref={selectedOptionRef}
          className="w-full p-2 mb-4 rounded-md shadow-md"
        >
          <option value="">--Select--</option>

          {data.data.users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Group Participant list</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Adding time</th>
            <th className="py-3 px-6 text-left">Delete Participant</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {teamMembers?.data?.team_members.map((user: any) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {user.user.name}
              </td>
              <td className="py-3 px-6 text-left">{user.user.created_at}</td>
              <td className="py-3 px-6 text-left">
                {user.user.id == session.user.id?"admin" : (
                  <button
                    onClick={() => handleDeleteTParticipantBtn(user.id)}
                    className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                )}
              </td>
              <td className="py-3 px-6 text-left">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddParticipantForm;
