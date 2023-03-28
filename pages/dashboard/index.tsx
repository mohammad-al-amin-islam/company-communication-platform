import Dashboard from "@/components/dashboard/main-dashboard";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Dashboard>
        <PotectedSessionRoute>
          <div className="flex justify-center items-center h-72">
            <h1 className="text-2xl font-bold mb-4">Welcome to dashboard</h1>
          </div>
        </PotectedSessionRoute>
      </Dashboard>
    </>
  );
};

export default DashboardPage;
