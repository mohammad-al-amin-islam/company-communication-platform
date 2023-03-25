import { useState,useRef } from "react";

const AddUserForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const nameValueRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLSelectElement>(null);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedOption = selectedOptionRef.current?.value ?? "";
    const name = nameValueRef.current?.value ?? "";
    const email = emailRef.current?.value?? "";
    const password = passwordRef.current?.value?? "";
    console.log(selectedOption, name, email, password,);
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-10 text-3xl font-medium">Add user here</h1>
      <form className="flex flex-col w-2/4 shadow-lg p-7" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input" className="mb-2">
            Enter user name:
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            ref={nameValueRef}
            className="w-full p-2 mb-4 rounded-md shadow-md"
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
            className="w-full p-2 mb-4 rounded-md shadow-md"
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
            className="w-full p-2 mb-4 rounded-md shadow-md"
          />
        </div>
        
        <label htmlFor="options" className="mb-2">
          Select a role for user:
        </label>
        <select
          name="options"
          id="options"
          ref={selectedOptionRef}
          className="w-full p-2 mb-4 rounded-md shadow-md"
        >
          <option value="">--Select--</option>
          <option value="Manager">Manager</option>
          <option value="Member">Member</option>
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