import { FileModel, User } from '@/db/Schema'
import { NextResponse } from 'next/server'
import { currentUser } from "@clerk/nextjs"
import connectToDatabase from '@/db/connect'

export const POST = async (req) => {
    const { userId } = req.json()
    const user = await currentUser()
    await connectToDatabase()
    console.log("user", user)
    if (!user) return NextResponse.redirect(new URL("/sign-in", req.url))
    const u = await User.findOne({ userId: user.id })
    if (!user) {
        return NextResponse.json({ error: 'Invalid user id' })
    }
    if (!u) {
        const newUser = new User({
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        await newUser.save()
    }
    const files = await FileModel.find({ userId: user.id })
    return NextResponse.json({ success: true, files: files })
}