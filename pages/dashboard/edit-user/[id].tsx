import Dashboard from "@/components/dashboard/main-dashboard";
import SelectedUserForm from "@/components/dashboard/edit-user/selected-user-form";
import getAllUsers from "@/lib/hooks/getAllUsers";
import { getUserById } from "@/lib/query/hasuraQueries";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const SelectedUser = () => {
  const router = useRouter();
  const id = router.query.id;
  const query = getUserById(id);
  const { data, isLoading } = useQuery(["specificUser", id], () =>
    getAllUsers(query)
  );

  return (
    <div>
      <Dashboard>
        <SelectedUserForm
          user={data?.data?.users_by_pk}
          isLoading={isLoading}
        />
      </Dashboard>
    </div>
  );
};

export default SelectedUser;
