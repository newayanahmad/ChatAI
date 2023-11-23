import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectToDatabase from "@/db/connect";
import { User } from "@/db/Schema";

export const GET = async (req) => {
    await connectToDatabase()
    const user = await currentUser()
    console.log("user", user)
    if (!user) return NextResponse.redirect(new URL("/sign-in", req.url))
    const u = await User.findOne({ userId: user.id })
    if (!u) {
        const newUser = new User({
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        await newUser.save()
    }
    return NextResponse.redirect(new URL("/", req.url))
}