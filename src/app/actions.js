"use server";
const { s3Client } = require("@/lib/s3")

export const UploadToS3 = (f) => {
    const file = JSON.parse(f)
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: file,
        ContentType: file.type,
        ACL: "public-read"
    }
    s3Client.send(params, (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(data)
        return data
    })
}
