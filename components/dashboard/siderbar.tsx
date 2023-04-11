// import useAdmin from "@/lib/hooks/useAdmin";
// import { useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { RiDashboardFill,RiEditBoxFill } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { BsPersonFillAdd } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";
import { MdCreateNewFolder,MdManageAccounts } from "react-icons/md";
import { FaHourglassStart } from "react-icons/fa";

const Sidebar = ({ admin: isAdmin }: any) => {
  const { data: session }: any = useSession();
  const admminFS = session?.user?.role;

  const adminFS = !!admminFS;
  // console.log(adminFS)

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500">
      <div className=" h-screen w-64 text-white flex flex-col">
        <div className="p-4 flex items-center">
          <h1 className="text-lg font-bold flex items-center">
            <RiDashboardFill className="mr-2"/>
            CCP Dashboard
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ul className="p-4">
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/user-list"
                  className="link-style"
                >
                  <CgUserList className="mr-2"/>
                  UserList
                </Link>
              </li>
            )}
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/add-user"
                  className="link-style"
                >
                  <BsPersonFillAdd className="mr-2" />
                  Add User
                </Link>
              </li>
            )}
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/remove-user"
                  className="link-style"
                >
                  <HiUserRemove className="mr-2" />
                  Remove user
                </Link>
              </li>
            )}
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/edit-user"
                  className="link-style"
                >
                  <RiEditBoxFill className="mr-2"/>
                  Edit user
                </Link>
              </li>
            )}
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/create-teams"
                  className="link-style"
                >
                  <MdCreateNewFolder className="mr-2" />
                  Create Teams
                </Link>
              </li>
            )}
            {admminFS == "admin" && (
              <li className="mb-4">
                <Link
                  href="/dashboard/manage-teams"
                  className="link-style"
                >
                  <MdManageAccounts className="mr-2" />
                  Manage Teams
                </Link>
              </li>
            )}

            <li className="mb-4">
              <Link
                href="/dashboard/start-conversation"
                className="link-style"
              >
                <FaHourglassStart className="mr-2" />
                Start Conversation
              </Link>
            </li>

            {/* <li className="mb-4">
              <Link href="#" className="hover:text-gray-200">
                Settings
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
