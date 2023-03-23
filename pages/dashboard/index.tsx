import Dashboard from "@/components/dashboard/main-dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <Dashboard>
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu
            mauris auctor, molestie eros nec, lacinia elit. Donec commodo tortor
            vel leo malesuada, sed bibendum enim tincidunt. Morbi sodales auctor
            justo, eu molestie arcu eleifend eu.
          </p>
        </div>
      </Dashboard>
    </>
  );
};

export default DashboardPage;
