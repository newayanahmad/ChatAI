import { FileModel } from '@/db/Schema'
import { NextResponse } from 'next/server'
import { currentUser } from "@clerk/nextjs"
import connectToDatabase from '@/db/connect'

export const POST = async (req) => {
    const { id } = await req.json()
    await connectToDatabase()
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ error: 'Invalid user id' })
    }
    console.log("file id", id)
    const file = await FileModel.findOne({ _id: id })
    console.log("file", file)
    return NextResponse.json({ success: true, file: file })
}