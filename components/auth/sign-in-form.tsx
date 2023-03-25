import Link from "next/link";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.ok) {
      event.target.reset();
      alert("Login successful");
    }
    if (!result?.ok) {
      event.target?.reset();
      alert(result?.error);
    }
    console.log(result);
  };
  return (
    <div className="max-w-md w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-6 font-bold text-gray-800 text-center uppercase">
            Sign in Here
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Enter your Email Address"
              ref={emailRef}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-5">
          <p className="mb-5">Don not have any account?</p>
          <Link
            href="/sign-up"
            className="mt-5 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
