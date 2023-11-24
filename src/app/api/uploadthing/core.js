import { FileModel } from "@/db/Schema";
import connectToDatabase from "@/db/connect";
import { currentUser } from "@clerk/nextjs";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const auth = (req) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    pdfUploader: f({ pdf: { maxFileSize: "10MB" } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {

            const user = await currentUser()
            if (!user) throw new Error("Unauthorized")
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await connectToDatabase()
            console.log("Upload complete!", file);
            const f = await FileModel({
                userId: metadata.userId,
                fileUrl: file.url,
                fileName: file.name,
                fileKey: file.key,
            })
            await f.save()
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { file, fileId: f._id };
        }),
};


