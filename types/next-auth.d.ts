// import { Session } from "next-auth"
// import { JWT } from "next-auth/jwt"

// /** Example on how to extend the built-in session types */
// declare module "next-auth" {
//   interface Session {
//     /** This is an example. You can find me in types/next-auth.d.ts */
//     foo: string
//   }
// }

// /** Example on how to extend the built-in types for JWT */
// declare module "next-auth/jwt" {
//   interface JWT {
//     /** This is an example. You can find me in types/next-auth.d.ts */
//     bar: number
//   }
// }

// https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
