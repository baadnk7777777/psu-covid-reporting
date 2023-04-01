import React from 'react'
import psu_logo from '../public/images/PSU_CoC_ENG.png'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'

export const loginForm = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col-2 w-full rounded-2xl border border-2-black ">

            <div className=" bg-[#009CDE] w-1/2 rounded-l-2xl"></div>

            <div className=" px-10 py-10 flex flex-col w-1/2 justify-center items-center ">
                <div className="w-40">
                    <Image src={psu_logo} alt="Logo" />
                </div>

                <div className=" w-ful items-center">
                    <p className=' font-work_sans font-bold mt-10 text-center'>PSU COVID REPORT</p>
                    <p className=' font-work_sans font-light text-gray-500 text-sm mb-10'>This website for get covid report from PSU students</p>
                </div>

                <input type="text" className='  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg' placeholder='PSU Passport Account Name: ' />
                <input type="text" className=' mt-4  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg' placeholder='Password' />



                <button onClick={() => router.push('/studentForm')} className='mt-4 font-work_sans font-bold bg-[#009CDE] px-2 py-3 rounded-2xl text-white w-1/2'>LOGIN</button>




            </div>
        </div>
    )
}

export default loginForm
