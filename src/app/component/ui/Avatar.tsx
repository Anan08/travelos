'use server'
import { auth, signOut } from "../../../../auth";
import { handleSignIn, handleSignOut } from "@/app/lib/useAuth";

export default async function Avatar({session} : any) {

    if (session) {
        <form
        action={handleSignIn}>
            <button type="submit" className="text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
            </button>
        </form>
    } 
    return (
        <form
        action={handleSignOut}>
            <button type="submit" className="text-sm font-semibold rounded-md text-white shadow-sm px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Out
            </button>
        </form>
    )
    
}