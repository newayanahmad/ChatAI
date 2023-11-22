import Image from 'next/image'
import { Button } from './ui/button'
import { currentUser, UserButton } from "@clerk/nextjs"


const Navbar = async () => {
    const user = await currentUser()


    console.log(user)
    return (
        <div className="w-full h-14 flex items-center justify-center shadow-md">
            <div className='flex justify-around items-center w-full'>
                <div className="left"><Image src={"/logo.jpg"} width={50} height={20} /></div>
                <div className="right">
                    <ul className='flex items-center justify-center gap-6'>
                        <li className="cursor-pointer hover:text-blue-700">Pricing</li>
                        <li className="cursor-pointer hover:text-blue-700">About</li>
                        {user ? <UserButton /> : <><Button variant="outline" >SIGN IN</Button>
                            <Button >Get Started</Button></>}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Navbar