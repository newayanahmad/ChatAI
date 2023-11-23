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
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { file };
        }),
};


