import getAllUsers from "@/lib/hooks/getAllUsers";
import { allUserQuery } from "@/lib/query/hasuraQueries";
import React from "react";
import {useQuery} from "react-query"


const UserListInfo = () => {
const {data,isLoading} = useQuery(['alluser', allUserQuery],()=>getAllUsers(allUserQuery))
if(isLoading){
    return <div>Loading...</div>
}

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
          {data.data.users.map((user:any) => (
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
    </div>
  );
};

export default UserListInfo;
