import { profile } from "console"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google({
    profile(profile) {
      console.log("Profile Google : ",profile)

      let userRole = "user"
      if(profile?.email == "anandapgt@gmail.com") {
        userRole = "admin"
      }
      console.log("updated profile : ",profile)
      
      return {
        ...profile,
        role : userRole,
      };
    }
  })]
})