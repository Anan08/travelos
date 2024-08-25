import { prisma } from "@/utils/prisma";

export async function GET(){

    try {
        const result = await prisma.packageTransaction.findMany({
            select: {
                id:true,
                status:true,
                prices:true,
                amount:true,
                packageName:true,
                userId:true,
        }
    })
    
    return Response.json(result)
        
    } catch (error: any) {
        return Response.json({ status: 500, message: error.message, resul: error });
    }

}

