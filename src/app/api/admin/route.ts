import { prisma } from '@/utils/prisma';

export async function PUT(req:Request) {
    try {
        const data = await req.json();

        const result = await prisma.packageTransaction.update({
            where : {
                id : data.id
            },
            data : {
                status : data.status
            }
        })
        return Response.json(result)
    } catch (error) {
        return Response.json(error)
    }    

}