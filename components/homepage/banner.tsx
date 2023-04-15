import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Banner = () => {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 justify-items-center items-center">
        <div className="flex justify-center flex-col">
          <h1 className="text-5xl text-start mb-2 font-semibold text-rose-800">
            Welcome to <br /> <span className="text-blue-600  font-sans">Communication Platform</span>
          </h1>
          <p className="mt-1 text-green-600">
            Communication between team now become easier
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="btn focus:outline-none focus:shadow-outline hover:bg-green-700 flex items-center "
          >
            Get Started <AiOutlineArrowRight />
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
