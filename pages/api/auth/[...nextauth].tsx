import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials:any, req:any): Promise<any>{
        // Add logic here to look up the user from the credentials supplied

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
                  password
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

        const existEmail = result.data.users.find(
          (user: any) => user.email === credentials.email
        );
        console.log(existEmail)
        if (!existEmail) {
          throw new Error("No user found");
        }
        console.log(credentials.email,credentials.password)
        const validPassword = existEmail.password == credentials.password;
        console.log(validPassword);

        if (!validPassword) {
          throw new Error("Incorrect Password");
        }

        return { email: existEmail.email };
      },
    }),
  ],
});
