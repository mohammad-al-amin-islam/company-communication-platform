import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-5">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
        <span className="mr-2">Loading...</span>
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 018 8v-2a6 6 0 00-6-6h-2zm-8 8a8 8 0 01-8-8h-4a12 12 0 0012 12v-4zm8 0a8 8 0 01-8 8v2a6 6 0 006-6h2z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Loading;
