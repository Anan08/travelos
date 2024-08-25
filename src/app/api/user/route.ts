import { prisma } from "@/utils/prisma"


export async function GET(req : Request){
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        const result =  await prisma.packageTransaction.findMany({
            where: {
                userId : userId as any
            }
        });

        return Response.json(result)
    } catch (error) {
        return Response.json({status:500, message: error});
    }
}

