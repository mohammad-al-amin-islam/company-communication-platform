import Dashboard from "@/components/dashboard/main-dashboard";
import PotectedSessionRoute from "@/lib/secured-page/protected-session-route";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Dashboard>
        <PotectedSessionRoute>
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to dashboard</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu
              mauris auctor, molestie eros nec, lacinia elit. Donec commodo
              tortor vel leo malesuada, sed bibendum enim tincidunt. Morbi
              sodales auctor justo, eu molestie arcu eleifend eu.
            </p>
          </div>
        </PotectedSessionRoute>
      </Dashboard>
    </>
  );
};

export default DashboardPage;
