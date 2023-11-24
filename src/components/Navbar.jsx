import Image from 'next/image'
import { Button } from './ui/button'
import { currentUser, UserButton } from "@clerk/nextjs"
import Link from 'next/link'


const Navbar = async () => {
    const user = await currentUser()
    // console.log(user)
    return (
        <div className="w-full absolute bg-white top-0 left-0 h-14 flex items-center justify-center shadow-md">
            <div className='flex justify-around items-center w-full'>
                <Link href={"/"} className="left"><Image src={"/logo.png"} width={90} height={45} alt='ChatAI Logo' /></Link>
                <div className="right">
                    <ul className='flex items-center justify-center gap-6'>
                        <li className="cursor-pointer hover:text-blue-700">Pricing</li>
                        <li className="cursor-pointer hover:text-blue-700">About</li>
                        {user ? <UserButton afterSignOutUrl='/' /> : <>
                            <Link href={"/sign-in"}><Button variant="outline" >SIGN IN</Button></Link>
                            <Link href={"/sign-up"}><Button >Get Started</Button></Link>
                        </>}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Navbar