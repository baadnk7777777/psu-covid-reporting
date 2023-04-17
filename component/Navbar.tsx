import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import { Popover } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Image from 'next/image'
import { useRouter } from 'next/router'
import psu_logo from '../public/images/PSU_CoC_ENG.png'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

type NavLink = {
    label: string;
    href: string;
};

const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const dashboardLinks: NavLink[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/logout' },
];

function Navbar() {
    const router = useRouter();
    const app = getAuth();
    const [user, loading] = useAuthState(app);
    const [isShow, setIsShow] = useState(false);

    const [userDisplay, setuserDisplay] = useState("");

    

    useEffect(() => {
        const userFromStorage = sessionStorage.getItem('user');
        console.log(userFromStorage);
        if (userFromStorage) {
            setIsShow(true);
        }

    }, []);


    const hanndleLink = () => {
        router.push('/login_screen');
    }

    const handleDashboard = () => {
        router.push('/dashboard');
    }

    const handleReporting = () => {
        router.push('/studentForm');
    }

    const handleLogout = async () => {
        await app.signOut();
    }

    

    return (

        <div className="flex   px-2 py-3 bg-[#009CDE] justify-around font-work_sans font-bold text-white shadow-md drop-shadow-md">
            <div className="flex justify-start">
                <p onClick={()=> {router.push("/dashboard")}} >PSU COVID REPORTING {userDisplay}</p>
            </div>
            {user &&
                <div className="flex justify-end">
                    <a onClick={() => handleDashboard()} className="text-gray-400 cursor-not-allowed">Dashboard</a>
                </div>

            }

{user &&
                <div className="flex justify-end">
                    <a onClick={() => handleReporting()} className="text-gray-400 cursor-not-allowed">Reporting</a>
                </div>

            }

            {user &&
                <div className="flex justify-end">
                    <a onClick={() => handleLogout()} className="text-gray-400 cursor-not-allowed">Logout</a>
                </div>

            }
        </div>
    )
}

export default Navbar