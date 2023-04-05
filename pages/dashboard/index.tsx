import Dashboard from "@/components/dashboard/main-dashboard";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import Image from "next/image";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Dashboard>
        <PotectedSessionRoute>
          <div className="flex flex-col items-center bg-white h-screen">
            <h1 className="text-2xl font-bold my-4">Welcome to dashboard</h1>
            <Image src="/dashboard-img.jpg" alt="My Image" width={450} height={450} />
          </div>
        </PotectedSessionRoute>
      </Dashboard>
    </>
  );
};

export default DashboardPage;
