import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

export async function GET(req: Request, res: Response){

    // console.log(session.user.email)
    try {
        const result = await prisma.packages.findMany({
            select: {
                id:true,
                title:true,
                desc:true,
                prices:true
        }
    })

        const response = {
            status: 200,
            data: result,
        }
    
        return Response.json(response)
        
    } catch (error: any) {
        return Response.json({ status: 500, message: error.message, resul: error });
    }

}

