import { prisma } from "@/utils/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request){

    // console.log(session.user.email)
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('uid');

        if (!userId) {
            return NextResponse.json({status: 400, message: 'user ID not found'})
        }

        await prisma.packageTransaction.findMany({
            where: {
                userId: userId
            }
        });

        return NextResponse.json({status:200, message: 'success'})
    } catch (error) {
        return NextResponse.json({status:500, message: error});
    }
}

