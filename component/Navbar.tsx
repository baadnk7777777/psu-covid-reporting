import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import { Popover } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Image from 'next/image'
import { useRouter } from 'next/router'
import psu_logo from '../public/images/PSU_CoC_ENG.png'

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
    const user = router.query.psuPassport;
    const role = router.query.role;

    const [isShow, setIsShow] = useState(false);


    const hanndleLink = () => {
        router.push('/login_screen');
    }

    const handleDashboard = () => {

        router.push({
            pathname: '/dashboard',
            query: { user, role }
        });

    }

    useEffect(() => {
        if (user) {
            setIsShow(true);
        }
    }, []);

    return (

        <div className="flex   px-2 py-3 bg-[#009CDE] justify-around font-work_sans font-bold text-white shadow-md drop-shadow-md">
            <div className="flex justify-start">
                <p>PSU COVID REPORTING</p>
            </div>
            {!isShow &&
                <div className="flex justify-end">
                    <a onClick={() => handleDashboard()} className="text-gray-400 cursor-not-allowed">Dashboard</a>
                </div>
            }
        </div>
    )
}

export default Navbar