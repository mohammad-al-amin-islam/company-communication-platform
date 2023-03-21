import SignInForm from "@/components/auth/sign-in-form";
import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;
