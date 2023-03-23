import SignUpForm from "@/components/auth/sing-up-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const SingUp = () => {
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
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default SingUp;
