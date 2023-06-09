import getAllUsers from "@/lib/hooks/getAllUsers";
import { allUserQuery, removeUserQuery } from "@/lib/query/hasuraQueries";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../shared/loading";

const RemoveUserForm = () => {
  const { data, isLoading } = useQuery(["alluser", allUserQuery], () =>
    getAllUsers(allUserQuery)
  );
  if (isLoading) {
    return <Loading/>;
  }

  const handleButtonClick = async (email: string) => {
    // console.log(email);

    const query = removeUserQuery(email);

    const data = await getAllUsers(query);
    if (data.data.delete_users.returning[0].id) {
        alert("User Removed successfully");
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-3xl my-5 font-medium text-indigo-500">
        Remove user form here
      </h1>
      <div className="border-b-2 border-gray-400 mb-2"></div>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">User role</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.data.users.map((user: any) => (
            <tr
              key={user.email}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {user.name}
              </td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">
                {/* {user.role !== "admin" && ( */}
                  <button
                    className="bg-blue-500 disabled:bg-slate-400 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                    onClick={() => handleButtonClick(user.email)}
                    disabled={user.role === "admin"}
                  >
                    Remove
                  </button>
                {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RemoveUserForm;
