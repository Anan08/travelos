import { prisma } from "@/utils/prisma"

export async function GET(){

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

