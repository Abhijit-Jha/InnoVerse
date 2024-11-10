import prisma from "@/app/store/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { p_id, payload } = await req.json();
    const tech_stack = payload.tech_stack.split(",")
    const updatedProject = await prisma.project.update({
      where: { p_id },
      data: {
        title : payload.title,
        description : payload.description,
        image : payload.description,
        live_Link  : payload.live_Link,
        source_code : payload.source_code,
        tech_stack : tech_stack
      }
    });

    return NextResponse.json(
      { message: "Project updated successfully", updatedProject },
      { status: 200 }
    );
  } catch (error:unknown) {
    

    return NextResponse.json(
      { error: "Something went wrong with the DB" },
      { status: 500 }
    );
  }
}
