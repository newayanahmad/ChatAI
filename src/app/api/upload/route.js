import { s3Client } from "@/lib/s3";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { uploadDirect } from "@uploadcare/upload-client";
import { currentUser } from "@clerk/nextjs";


export const POST = async (req) => {
    const { file } = await req.json()
    try {
        // // console.log("Success", d);
        if (!file) {
            return NextResponse.json({ success: false })
        }
        const { user } = await currentUser()
        await connectToDatabase()
        console.log("Upload complete!", file);
        const f = await FileModel({
            userId: user.id,
            fileUrl: file.url,
            fileName: file.name,
            fileKey: file.key,
        })
        await f.save()
        return NextResponse.json({ success: true })
    }
    catch (err) {
        console.log("Error", err);
        return NextResponse.json({ error: err })
    }
}
