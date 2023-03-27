import axios from "axios";
import Link from "next/link";
import React, { useRef } from "react";
const SignUpForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    

    const data = {
      email: email,
      password: password,
      username: name,
      role: "admin",
    };

    try {
      const res = await axios.post("/api/auth/signup", data);
      console.log(res.data);
      if(res.data.message.data.insert_users_one.email){
        event.target.reset();
        alert("Account created successfully");
      }
    } catch (e:any) {
      alert( e.response.data.message)
      console.log(e.response.data.message)
    }
  };

  return (
    <div className="max-w-md w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSignUpSubmit}>
          <h2 className="text-2xl mb-6 font-bold text-gray-800 text-center uppercase">
            Sign Up Here
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your name"
              ref={nameRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email Address"
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-5">
          <p className="mb-5">Already have any account?</p>
          <Link
            href="/sign-in"
            className="mt-5 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
