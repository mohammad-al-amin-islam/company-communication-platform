import axios from "axios";

const hasuraEndPoint = "https://easy-reptile-22.hasura.app/v1/graphql";
const hasuraSecret =
  "fJatRu46jjdSAj3QQ9uYyAK8wOrgPBUxWFedc1z8YpHivmqguOC1MNqdBlhQGiua";

const getAllUsers = async (query: any): Promise<any> => {
  const res = await axios.post(hasuraEndPoint, query, {
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": hasuraSecret,
    },
  });
  return res.data;
};

export default getAllUsers;
