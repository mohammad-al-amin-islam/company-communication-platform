import React from 'react';
import Sidebar from './siderbar';

const Dashboard = ({children}:any) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow bg-gray-200 p-4">
        {children}
      </main>
    </div>
  );
}

export default Dashboard;