import prisma from "@/app/store/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = await req.nextUrl.pathname.split("/").at(-1)
    const project = await prisma.project.findFirst({
        where: {
            p_id: params
        }
    })
    
    if (!project) {
        return NextResponse.json({
            error: "This project doesnt exist in our Database!",
            success: false
        },{status : 404})

    }


    return NextResponse.json({
        params,
        project,
        success : true
    },{status : 200})

}