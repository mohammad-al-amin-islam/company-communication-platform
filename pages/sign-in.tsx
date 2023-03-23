import SignInForm from "@/components/auth/sign-in-form";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignIn = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();

 
  if (status === "loading") {
    return <p className="text-center mt-10 text-xl">Loading or not authenticated...</p>
  }

  if (status === "authenticated") {
    router.push("/");
    return;
  }

  return (
    <>
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;
