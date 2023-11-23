import { FileModel } from '@/db/Schema'
import { NextResponse } from 'next/server'
import { currentUser } from "@clerk/nextjs"

export const POST = async (req) => {
    const { userId } = req.json()
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ error: 'Invalid user id' })
    }
    const files = await FileModel.find({ userId: user.id })
    return NextResponse.json({ success: true, files: files })
}