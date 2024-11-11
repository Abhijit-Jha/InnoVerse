import prisma from "@/app/store/db";
import { authoptions } from "@/app/store/lib/authoption"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const data = await req.json().catch((() => null));
        const techStack = data.tech_stack? data.tech_stack.split(",") : []
        
        if (!data?.title || !data?.description) {
            return NextResponse.json({
                "error": "Please provide Title and Description!",
                authorized: true,
                success: false
            });
        }

        const session = await getServerSession(authoptions);

        if (!session) {
            return NextResponse.json({
                "error": "Please Login!!",
                authorized: false,
                success: false
            });
        }

        
        const newProject = await prisma.project.create({
            data: {
                user_id: session.user.id,
                title: data.title,
                description: data.description,
                image: data.image,
                tech_stack: techStack,
                source_code: data.source_code,
                live_Link: data.live_Link
            }
        });

        if (!newProject) {
            
            return NextResponse.json({
                error: "Error while uploading. Please try again later!",
                authorized: true,
                success: false
            },{status:500});
        }


        return NextResponse.json({
            success: true,
            authorized: true,
            newProject
        },{status : 201});

    } catch (e: unknown ) {
        return NextResponse.json({
            "error": "It's not you, it's us! Something went wrong.",
            success: false,
            systemError : e
        }, { status: 500 });  
    }
}


export async function GET() {
    const session = await getServerSession(authoptions)
    
    if (!session) {
        return NextResponse.json({
            success: false,
            error: "Please Login to Continue",
            authorized: false
        },{status : 401})
    }
    const projects = await prisma.project.findMany()
    if (!projects) {
        return NextResponse.json({
            success: false,
            error: "No Projects!"
        },{status : 400})
    }
    return NextResponse.json({
        projects
    },{status : 200})
}