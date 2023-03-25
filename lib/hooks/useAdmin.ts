import axios from "axios";
import { useState } from "react";
import { useAddminHasuraQuery } from "../query/hasuraQueries";
import { useQuery } from "react-query";

export const useAdmin = (user: any) => {
  const hasuraEndPoint = "https://easy-reptile-22.hasura.app/v1/graphql";
  const hasuraSecret =
    "fJatRu46jjdSAj3QQ9uYyAK8wOrgPBUxWFedc1z8YpHivmqguOC1MNqdBlhQGiua";

  const query = useAddminHasuraQuery(user);

  const { data, error, isLoading } = useQuery("adminInfo", () =>
    axios.post(hasuraEndPoint, query, {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": hasuraSecret,
      },
    })
  );

  const role = data?.data?.data.users.map((user:any) => user.role === "admin");
  return [role, isLoading];
};

export default useAdmin;
