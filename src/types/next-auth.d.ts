// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;  // Add role to the session user
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;  // Add role to the User type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;  // Add role to the JWT token
  }
}
