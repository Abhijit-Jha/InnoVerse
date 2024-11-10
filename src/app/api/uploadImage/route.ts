import cloudinary from "@/app/store/lib/cloudinary";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { data: fileStr } = await req.json();

        // console.log("File string received:", fileStr);


        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'your_upload_preset',
        });


        return NextResponse.json({ url: uploadedResponse.secure_url }, { status: 200 });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json({ error: 'Something went wrong during the upload.' }, { status: 500 });
    }
}
