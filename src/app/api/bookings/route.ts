import { prisma } from "@/utils/prisma"


export async function POST(req:Request) {

    try {
        const data = await req.json()
        const result = await prisma.packageTransaction.create({
            data: {
                userId: data.userId,
                packageId: data.packageId,
                packageName: data.packageName,
                amount: data.amount,
                prices: data.prices,
                status: 'unverified',
                code: data.code
            }
        })
        return Response.json({status:200, message:result})        

    } catch (error) {
        return Response.json({status:500, message: error})
    }   
}
