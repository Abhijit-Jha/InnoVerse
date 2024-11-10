import prisma from "@/app/store/db";
import { authoptions } from "@/app/store/lib/authoption";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import zod from "zod"
export async function POST(req : NextRequest){
    const session = await getServerSession(authoptions)
    // console.log(session)
    const updatedName = await req.json()
    const nameSchema = zod.string()
    const response = nameSchema.safeParse(updatedName.name)
    if(!response.success){
        return NextResponse.json({
            success : false,
            error : "Provide Proper Name!!"
        })
    }
    if(session){
    await prisma.user.update({
        where : {
            id : session.user.id,
            username : session.user.username
        },
        data : {
            name : updatedName.name
        }
    })
    }
    if(!updatedName){
        return NextResponse.json({
            success : false,
            error : "Error In Updating Name,Try After Some Time!!"
        })
    }

    return NextResponse.json({
        success :true,
        message : "Name Updated Successfully"
    })
}