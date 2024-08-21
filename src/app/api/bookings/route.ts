import { prisma } from "@/utils/prisma"

export async function POST(req:Request, res: Response) {

    try {

        const url = new URL(req.url);
        const id = url.searchParams.get('uid');
        if (id == "undefined") {
            return Response.json({status:400, message:"unable to book, login first"})
                
        }

        const packageId = url.searchParams.get('packageId');
        
        if(!packageId || !id) {
            return Response.json({status:400, message:'couldnt find data given'})
        }

        const result = await prisma.packageTransaction.create({
            data: {
                userId:id,
                packageId:packageId
            }
        })
        return Response.json({status:200, message:result})        

    } catch (error) {
        return Response.json({status:500, message: error})
    }

    
}
