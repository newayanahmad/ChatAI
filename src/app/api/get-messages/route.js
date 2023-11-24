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
    const file = await FileModel.findOne({ userId: user.id, _id: id })
    return NextResponse.json({ success: true, messages: file.messages })
}