// import useAdmin from "@/lib/hooks/useAdmin";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Sidebar = ({admin:isAdmin}:any) => {
  // const { data: session } = useSession();
  // const email = session?.user?.email;

  // const [role, isLoading] = useAdmin(email);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // const isAdmin = role[0];

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 h-screen w-64 text-white flex flex-col">
      <div className="p-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.293 6.293a1 1 0 0 0-1.414-1.414L10 12.586 6.707 9.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7z"
          />
        </svg>
        <h1 className="text-lg font-bold">CCP Dashboard</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="p-4">
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/user-list" className="hover:text-gray-200">
                UserList
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/add-user" className="hover:text-gray-200">
                Add User
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/remove-user" className="hover:text-gray-200">
                Remove user
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/edit-user" className="hover:text-gray-200">
                Edit user
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/create-teams" className="hover:text-gray-200">
                Create Teams
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="mb-4">
              <Link href="/dashboard/manage-teams" className="hover:text-gray-200">
                Manage Teams
              </Link>
            </li>
          )}

          <li className="mb-4">
            <Link href="#" className="hover:text-gray-200">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
