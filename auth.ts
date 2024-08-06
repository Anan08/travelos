import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import Credentials from "next-auth/providers/credentials"


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google, Twitter],
})