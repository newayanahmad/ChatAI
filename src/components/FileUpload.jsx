"use client"
import { useUploadThing } from "@/lib/uploadthing";
import { Inbox, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone"
import { toast, useToast } from "./ui/use-toast";


const FileUpload = () => {

    const router = useRouter();
    const { toast } = useToast()
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: (res) => {
            alert("uploaded successfully!");
            setIsLoading(false);
            console.log("inside onClientUploadComplete", res);
        },
        onUploadError: () => {
            alert("error occurred while uploading");
        },
        onUploadBegin: () => {
            alert("upload has begun");
        },
    },)
    const { getRootProps, getInputProps } = useDropzone(
        {
            accept: { "application/pdf": [".pdf"] },
            maxFiles: 1,
            onDrop: async (acceptedFiles) => {
                console.log(acceptedFiles);
                if (acceptedFiles.length == 0) {
                    alert("Please select a PDF file")
                    return
                }
                const file = acceptedFiles[0];
                if (file.size > 10 * 1024 * 1024) {
                    console.log("too big");
                    // bigger than 10mb!
                    return;
                }
                try {
                    setUploading(true);

                    const res = await startUpload(acceptedFiles)
                    console.log(res)
                    if (!res) {
                        return toast({
                            title: "Something went wrong, no response received",
                            description: "Please try again",
                            variant: "destructive"
                        })
                    }
                    // const [filePesponse] = res
                    // const key = filePesponse?.key
                    // if (!key) {
                    //     return toast({
                    //         title: "Something went wrong",
                    //         description: "Please try again",
                    //         variant: "destructive"
                    //     })
                    // }

                } catch (error) {
                    console.log(error);
                }
            },
        }
    )
    return (
        <div className="p-2 bg-white rounded-xl">
            <div
                {...getRootProps({
                    className:
                        "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                })}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <>
                        {/* loading state */}
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="mt-2 text-sm text-slate-400">
                            Hold tight, it won't take much...
                        </p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-500" />
                        <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default FileUpload