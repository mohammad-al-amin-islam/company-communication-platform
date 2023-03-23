
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-red-800 h-screen w-64 text-white flex flex-col">
      <div className="p-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18.293 6.293a1 1 0 0 0-1.414-1.414L10 12.586 6.707 9.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7z" />
        </svg>
        <h1 className="text-lg font-bold">My Sidebar</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="p-4">
          <li className="mb-4">
            <Link href="/dashboard/user-list" className="hover:text-gray-200">UserList</Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="hover:text-gray-200">Projects</Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="hover:text-gray-200">Tasks</Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="hover:text-gray-200">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

