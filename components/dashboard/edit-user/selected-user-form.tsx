import getAllUsers from "@/lib/hooks/getAllUsers";
import { updateUserInfo } from "@/lib/query/hasuraQueries";
import { useState, useRef } from "react";
import Loading from "../../shared/loading";

const SelectedUserForm = ({ user,isLoading}: any) => {
  const [selectedOption, setSelectedOption] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const selectedOptionRef = useRef<HTMLSelectElement>(null);

  if(isLoading){
    return <Loading/>
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const role = selectedOptionRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";



    const query = updateUserInfo(user.id,role,password)

    const data = await getAllUsers(query);
    if(data){
        alert("Succesfully updated")
        formRef.current?.reset();
    }

    
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="my-5 text-3xl font-medium border-2  border-b-green-500 border-spacing-y-5 p-3">Edit user here</h1>
      <form
        className="flex flex-col w-2/4 shadow-lg p-7 bg-white rounded-lg"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div>
          <label htmlFor="input" className="mb-2">
            Enter user name:
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            className="w-full p-2 mb-4 rounded-md shadow-md"
            value={user.name}
            disabled
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
            value={user.email}
            disabled
            className="w-full p-2 mb-4 rounded-md shadow-md"
          />
        </div>
        <div>
          <label htmlFor="input" className="mb-2">
            Set a new password for the user:
          </label>
          <input
            type="password"
            name="password"
            id="input"
            ref={passwordRef}
            className="w-full p-2 mb-4 rounded-md shadow-md"
            required
          />
        </div>

        <label htmlFor="options" className="mb-2">
          Change role for this user:
        </label>
        <select
          name="options"
          id="options"
          ref={selectedOptionRef}
          className="w-full p-2 mb-4 rounded-md shadow-md"
          required
        >
          <option value="">--Select--</option>
          <option value="manager">Manager</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
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

export default SelectedUserForm;
