import prisma from "@/app/store/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
export async function POST(req: NextRequest) {
    const data = await req.json()
    const hashedPassword = await bcrypt.hash(data.password,10)
    // console.log(hashedPassword)
    const user = await prisma.user.findFirst({
        where :{
            username : data.username,
            password : hashedPassword
        }
    })
    if(user){
        return NextResponse.json({
            error : "User already exist's Try Signing In Instead"
        })
    }

    try {
        const user = await prisma.user.create({
            data :{
                username :data.username,
                password : hashedPassword
            }
        })
        return NextResponse.json({
            user
        })
    } catch (e:unknown) {
        return NextResponse.json({
            error : "Error while Singin Up!!",
            systemError : e
        })
    }


}