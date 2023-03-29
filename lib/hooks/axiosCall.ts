import axios from "axios";

const axiosCall = async (token: any, query: any): Promise<any> => {
  const res = await axios.post(process.env.hasuraApi as string, query, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.data;
};

export default axiosCall;
