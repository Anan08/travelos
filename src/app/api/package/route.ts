import { prisma } from "@/utils/prisma"

export async function POST(req:Request) {

    const packages = await req.json()

    console.log(packages);

    const result = await prisma.packages.create({
        data: {
            title:packages.destination,
            desc:packages.desc,
            prices:packages.prices
        }
    })

    return Response.json({
        status:200,
        message: "Success",
        result
    })
}

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
    
        return Response.json(result)

    } catch (error: any) {
        return Response.json({ status: 500, message: error.message, resul: error });
    }

}

export async function DELETE(req:Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id')

        if(!id) {
            return Response.json({status:400, message: 'Package Id Null'})
        }

        const result = await prisma.packages.delete({
            where:{
                id : id
            }
        });
        console.log(result)
        return Response.json({status:200, message:'deleted succesfully'})
    } catch (error) {
        return Response.json({status:500, message: error})
    }

}

export async function PUT(req:Request) {
    try {
        const packages = await req.json()


        const result = await prisma.packages.update({
            where : {
                id: packages.id
            }, 
            data : {
                prices : packages.prices,
                title : packages.title,
                desc : packages.desc,
            }
        })
        return Response.json(result)
    } catch (error) {
        return Response.json({status:500, message: error})
    }
}