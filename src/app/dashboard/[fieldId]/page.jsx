"use client"

// import ChatWrapper from '@/components/chat/ChatWrapper'
import ChatComponent from '@/components/ChatComponent'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = ({ params }) => {
    const { fieldId } = params
    console.log(fieldId)
    const [file, setFile] = useState(null)
    const { isSignedIn, userId } = useAuth()

    if (!isSignedIn)
        redirect(`/auth-callback?origin=dashboard/${fieldId}`)
    const getFile = async () => {
        const res = await fetch("/api/get-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: fieldId
            }),
        })
        const data = await res.json()
        if (data.success) {
            setFile(data.file)
        }
    }
    useEffect(() => {
        getFile()
    }, [fieldId])

    return (
        <div className='flex-1 justify-between flex flex-col min-h-screen'>
            <div className=' w-full max-w-8xl grow lg:flex '>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex mt-14 min-h-1/2'>
                    <div className='xl:flex-1 xl:pl-6  lg:h-screen'>
                        {/* Main area */}{file &&
                            <iframe src={`https://docs.google.com/gview?url=${file.fileUrl}&embedded=true`} className='w-full h-full' />
                        }</div>
                </div>

                <div className='shrink-0 flex-1 border-t  md:mt-14 border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
                    {/* <ChatWrapper fileId={file.id} /> */}
                    {file && <ChatComponent fileId={file._id} />}
                </div>
            </div>
        </div>
    )
}

export default Page