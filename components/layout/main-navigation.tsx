import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const MainNavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: any = useSession();

  const firstName = session?.user?.name.split(" ");
  const navitems = (
    <>
      <Link
        href="/"
        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      {!session && (
        <Link
          href="/sign-in"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Sign In
        </Link>
      )}
      {session && (
        <Link
          href="/dashboard"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Dashboard
        </Link>
      )}
      {session && (
        <button
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      )}
      {session && (
        <p className="bg-slate-400 text-white px-3 py-3 rounded-full text-sm font-medium">
          {firstName[0]}
        </p>
      )}
    </>
  );
  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 via-blue-500 bg-gradient-repeating">
      <div className="mx-auto px-4 py-2 sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              CCP
            </Link>
          </div>
          <div className="flex sm:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: menu */}
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center">{navitems}</div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">{navitems}</div>
      </div>
    </nav>
  );
};

export default MainNavigationBar;
