import useAdmin from "@/lib/hooks/useAdmin";
import { useSession } from "next-auth/react";
import React from "react";
import Sidebar from "./siderbar";

const Dashboard = ({ children }: any) => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [role, isLoading] = useAdmin(email);
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="border-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
  //     </div>
  //   );
  // }
  return (
    <div className="flex">
      <Sidebar admin={role} />
      <main className="flex-grow bg-gray-200 p-4">{children}</main>
    </div>
  );
};

export default Dashboard;
