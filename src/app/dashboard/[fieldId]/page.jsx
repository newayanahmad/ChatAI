// import ChatWrapper from '@/components/chat/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
import { FileModel } from '@/db/Schema'
import connectToDatabase from '@/db/connect'
import { currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'



const Page = async ({ params }) => {
    await connectToDatabase()
    const { fieldId } = params
    console.log(fieldId)
    const user = await currentUser()
    if (!user || !user.id)
        redirect(`/auth-callback?origin=dashboard/${fieldId}`)

    const file = await FileModel.findOne({ _id: fieldId, userId: user.id })
    console.log(fieldId, user.id)
    // if (!file) notFound()

    return (
        <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex mt-14'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        {/* Main area */}
                        <PdfRenderer url={file.fileUrl} />
                    </div>
                </div>

                <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
                    {/* <ChatWrapper fileId={file.id} /> */}
                </div>
            </div>
        </div>
    )
}

export default Page