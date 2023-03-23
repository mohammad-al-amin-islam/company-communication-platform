import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jsonwebtoken from "jsonwebtoken";
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
      async authorize(credentials: any, req: any): Promise<any> {
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
        if (!existEmail) {
          throw new Error("No user found");
        }
        const validPassword = existEmail.password == credentials.password;

        if (!validPassword) {
          throw new Error("Incorrect Password");
        }

        return { email: existEmail.email };
      },
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: "HS256",
      });
      // console.log(encodedToken);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },

  callbacks: {
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    async jwt({ token }) {
      console.log(token);
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      // console.log(token.sub)
      // console.log(session)
      
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
});
