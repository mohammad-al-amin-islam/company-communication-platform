import getAllUsers from "@/lib/hooks/getAllUsers";
import { allUserQuery, getAlluserPagination } from "@/lib/query/hasuraQueries";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../shared/loading";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
const UserListInfo = () => {
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const offset = (page - 1) * pageSize;

  const allUserQuery = getAlluserPagination(pageSize, offset);
  const { data, isLoading } = useQuery(["alluser", allUserQuery], () =>
    getAllUsers(allUserQuery)
  );
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const pageCount = Math.ceil(
    data.data.users_aggregate?.aggregate.count / pageSize
  );
  console.log(pageCount);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-3xl my-5 font-medium">All user list</h1>
      <div className="border-b-2 border-gray-400 mb-2"></div>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">User role</th>
            <th className="py-3 px-6 text-left">Email</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-7">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-red-700 disabled:bg-slate-400 font-bold p-3 rounded-full mr-5"
        >
          <GrPrevious className="text-blue" />
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === pageCount}
          className="bg-red-700 disabled:bg-slate-400 font-bold p-3 rounded-full"
        >
          <GrNext className="text-blue" />
        </button>
      </div>
    </div>
  );
};

export default UserListInfo;
