import prisma from "@/app/store/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const id = await req.json()
    // console.log(id)

    if(!id){
        return NextResponse.json({
            success : false,
            error : "Login Issue"
        })
    }

    const projects = await prisma.project.findMany({
        where : {
            user_id : id.id
        }
    })

    if(projects.length==0){
        return NextResponse.json({
            projectsCount : 0,
            message : "No Projects Found!!"
        })
    }

    return NextResponse.json({
        projectsCount : projects.length,
        success : true,
        projects : projects
    })
}