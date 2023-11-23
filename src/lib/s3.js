import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    endpoint: process.env.DO_SPACES_URL,
    region: "blr1",
    credentials: {
        accessKeyId: process.env.DO_ACCESS_KEY,
        secretAccessKey: process.env.DO_SECRET_KEY
    }
})

export { s3Client }
