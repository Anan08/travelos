import NextAuth, { DefaultSession, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/utils/prisma"
 
const providers: Provider[] = [
  Credentials({
    name: 'credentials',
    credentials: { 
      password: { label: "Password", type: "password" },
      email: { label: "email", type: "text", placeholder: "John Smith" },
    }, 
    async authorize(credentials) {
      // check to see if email and password is there
      if(!credentials.email || !credentials.password) {
        throw new Error('Please enter an email and password')
      }

      // check to see if user exists
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email as string,
          password : credentials.password
        }
      });

      if (!user) {
        throw new Error('user not found')
      }

      // console.log(user)
      return user
    }
  })
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  session : {
    strategy : 'jwt'
  },
  callbacks: {
    async session({ session, token, user } : {session : any, token : any, user : any}) {
      console.log("session : ",session)
      // Add role value to user object so it is passed along with session
      session.user.role = user?.role ? user.role : token.user.role
      return session;
    },
    async jwt({ token, account, user }) {
      //if the user logs in, you save your user in token
      console.log("User : ",user, "Token : ", token)
      if (user){
        token.user=user
      }
      return Promise.resolve(token)
    },
  },
})