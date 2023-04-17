import React, { useState, useEffect } from 'react'
import psu_logo from '../public/images/PSU_CoC_ENG.png'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import { getDatabase, onValue, ref } from 'firebase/database'
import app from '@/utils/firebase'
import covid from '../public/images/covid.jpg'
import { initializeApp } from 'firebase/app'
import { initFirebase } from '@/utils/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

import { useAuthState } from 'react-firebase-hooks/auth';

export const LoginForm = () => {
    const router = useRouter();
    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [psuPassport, setPsuPassport] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    };

    const signWithEmail = async () => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result.user);
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (user) {
        router.push('/studentForm');
        return <div className="">Loading ...</div>;
    }

    return (
        <div className="flex flex-col-2 m-auto bg-slate-50 rounded-md ">

            <div className=" flex justify-center w-1/2 sm:w-1/4 rounded-l-2xl">
                <Image className=' rounded-md' src={covid} alt='' width={500} />
            </div>

            <div className="mb-4 px-10 py-10 flex flex-col w-1/2 justify-center items-center">
                <div className="">
                    <Image className=' object-none' width={160} src={psu_logo} alt="Logo" />
                </div>


                <div className="w-ful items-center">
                    <p className=' font-work_sans font-bold mt-10 text-center'>PSU COVID REPORT</p>
                    <p className=' font-work_sans font-light text-gray-500 text-sm mb-10'>This website for get covid report from PSU students</p>
                </div>


                <input onChange={(e) => setEmail(e.target.value)} type="text" className='  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg' placeholder='PSU Passport Account Name: ' />
                <input onChange={(e) => setPassword(e.target.value
                )} type="password" className=' mt-4  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg ' placeholder='Password' />


                <button onClick={()=> {signWithEmail()}} className='mt-4 mb-4 font-work_sans font-bold  px-2 py-3 rounded-2xl  w-1/2 bg-[#009CDE] text-white'>LOGIN</button>
                <button onClick={signIn}> <FcGoogle size={30} /> </button>



            </div>
        </div>
    )
}

export default LoginForm
