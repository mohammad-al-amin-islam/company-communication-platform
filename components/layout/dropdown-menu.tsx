import Link from "next/link";
import { useState } from "react";

const DropdownMenu = ({ userName,Email,Id }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const firstName = userName.split(" ")[0];

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  return (
    <div className="relative inline-block text-left  ">
      <button
        type="button"
        className="bg-slate-400 text-white px-3 py-3 rounded-full text-sm font-medium outline-none hover:outline-red-950"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleDropdown}
      >
        {firstName}
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3`}
        aria-labelledby="options-menu"
        role="menu"
        aria-orientation="vertical"
      >
        <div className="text-center"> 
          {/* <p className="p-5 text-xl font-sans font-bold">Update your profile</p> */}
          <div className="py-3 font-sans">
          <p className="font-bold">{userName}</p>
          <p>{Email}</p>
          </div>
        </div>

        <div className="py-1 px-1" role="none">
          <Link
            href={`/user/${Id}`}
            className="block px-4 py-2 text-sm text-center text-gray-700 border border-amber-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            tabIndex={-1}
            id="options-menu-item-0"
          >
           Manage your account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
