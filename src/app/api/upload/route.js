import { s3Client } from "@/lib/s3";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";


export const POST = async (req) => {
    const data = await req.formData()
    const file = data.get("file")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log(buffer);
    console.log(file.type)
    // Upload buffer to AWS S3
    const params = {
        Bucket: process.env.DO_SPACES_KEY,
        Key: file.name,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read"
    };
    try {
        const p = new PutObjectCommand(params)
        const d = await s3Client.send(p);
        console.log("Success", d);
        return NextResponse.json({ success: d })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }

}



