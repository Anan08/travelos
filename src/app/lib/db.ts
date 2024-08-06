import { prisma } from "@/utils/prisma";
import { useSession } from "next-auth/react";

interface data {
    email: String | null,
    id : String
}

export async function fetchPackagesFromDb(){
   try {
        const packages = await prisma.packages.findMany();
        return(packages);
   } catch (error) {
    console.error("Error fetching pkg", error);
    return [];
   }
    
}

export async function storeUserIntoDb(email:string) {

    return await prisma.user.create({
        data: {
            email,
        }
    })
}

export async function checkDb() {
    
}

