import axios from "axios";
import { useState, useRef } from "react";

const AddUserForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const nameValueRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const role = selectedOptionRef.current?.value ?? "";
    const name = nameValueRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    const data = {
      email: email,
      password: password,
      username: name,
      role: role,
    };

    try {
      const res = await axios.post("/api/auth/signup", data);
      console.log(res.data);
      if (res.data.message.data.insert_users_one.email) {
        formRef.current?.reset();
        alert("User created successfully");
      }
    } catch (e: any) {
      alert(e.response.data.message);
      console.log(e.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      {/* <h1 className="my-10 text-3xl font-medium">Add user here</h1> */}
      <h1 className="my-5 text-3xl font-medium border-2  border-b-green-500 border-spacing-y-5 p-3 text-indigo-500">
        Add user here
      </h1>
      <form
        className="flex flex-col w-2/4 shadow-lg p-7 bg-white rounded-lg"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="input" className="mb-2">
            Enter user name:
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            ref={nameValueRef}
            className="input-dashboard"
          />
        </div>
        <div>
          <label htmlFor="input" className="mb-2">
            Enter user email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            ref={emailRef}
            className="input-dashboard"
          />
        </div>
        <div>
          <label htmlFor="input" className="mb-2">
            Set a password for the user:
          </label>
          <input
            type="password"
            name="password"
            id="input"
            ref={passwordRef}
            className="input-dashboard"
          />
        </div>

        <label htmlFor="options" className="mb-2">
          Select a role for user:
        </label>
        <select
          name="options"
          id="options"
          ref={selectedOptionRef}
          className="input-dashboard"
        >
          <option value="">--Select--</option>
          <option value="manager">Manager</option>
          <option value="member">Member</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
