import { auth } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from "lucide-react";

const Page = () => {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          </div>

          <div className="flex mt-2">
            {isAuth && (
              <>
                <Link href={`/chat`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>

              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Unite with countless students, researchers, and professionals worldwide to instantly find answers and comprehend research through the power of AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <div className="">Upload your file here</div>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page