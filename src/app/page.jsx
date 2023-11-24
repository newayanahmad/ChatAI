import { auth } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from '@/components/FileUpload';

const Page = () => {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-yellow-100 via-red-100 to-blue-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          </div>

          <div className="flex mt-2">
            {isAuth && (
              <>
                <Link href={`/dashboard`}>
                  <Button>
                    Go to Dashboard <ArrowRight className="ml-2" />
                  </Button>
                </Link>

              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Unite with countless students, researchers, and professionals worldwide to instantly find answers and comprehend research through the power of AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<FileUpload />
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