import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Banner = () => {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 justify-items-center items-center">
        <div className="flex justify-center flex-col">
          <h1 className="text-5xl text-start">
            Welcome to Communication <br /> Platform
          </h1>
          <p className="mt-1 text-green-600">Communication between team now become easier</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-32 text-start mt-5 bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
          >
            Get Started
          </button>
        </div>
        <div>
          <Image src="/banner.jpg" alt="My Image" width={450} height={450} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
