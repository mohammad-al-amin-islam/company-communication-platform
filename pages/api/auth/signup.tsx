import axios from "axios";

async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return;
  }
  // console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const role = req.body.role;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid email or password" });
    return;
  }

  const hasuraEndPoint = "https://easy-reptile-22.hasura.app/v1/graphql";
  const hasuraSecret =
    "fJatRu46jjdSAj3QQ9uYyAK8wOrgPBUxWFedc1z8YpHivmqguOC1MNqdBlhQGiua";

  //get all data of users email addresses
  const { data: result }: any = await axios.post(
    hasuraEndPoint,
    {
      query: `
        query MyQuery {
          users {
            email
          }
        }
      `,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": hasuraSecret,
      },
    }
  );

  const existEmail = result.data.users.find((user:any) => user.email === email);
  if(existEmail) {
    res.status(422).json({ message: "Email Already exist" });
    return;
  }

  // users registration information
  const { data } = await axios.post(
    hasuraEndPoint,
    {
      query: `
        mutation {
            insert_users_one(object: {email: "${email}", password: ${password}, name: "${username}", role: "${role}"}) {
            email
            }
        }
    `,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": hasuraSecret,
      },
    }
  );

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  res.status(201).json({ message: data });
}
export default handler;
