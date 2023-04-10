import React, { useState, useEffect } from 'react'
import psu_logo from '../public/images/PSU_CoC_ENG.png'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import { getDatabase, onValue, ref } from 'firebase/database'
import app from '@/utils/firebase'
import covid from '../public/images/covid.jpg'

export const LoginForm = () => {

    type User = {
        psupassport: string;
        password: string;
        role: string;
    }

    const [user, setUser] = useState<User[]>([]);
    const [psuPassport, setPsuPassport] = useState("");
    const [password, setPassword] = useState("");

    const [uservertify, setvertify] = useState("");

    useEffect(() => {
        console.log("Hello word");
        const database = getDatabase(app);
        const starCountRef = ref(database, 'users');
        onValue(starCountRef, (snapshot) => {
            console.log(snapshot.val());
            const userList: User[] = [];

            snapshot.forEach((child) => {
                const childData = child.val();
                //console.log(childData);
                userList.push({ ...childData })

            });
            setUser(userList);

        })
    }, []);

    const handleSubmit = () => {
        for (var i = 0; i < user.length; i++) {
            if (psuPassport == user[i].psupassport) {
                if (password == user[i].password) {
                    const role = user[i].role
                    router.push({
                        pathname: '/studentForm',
                        query: { psuPassport, role }
                    });
                }
            }
        }

        // ดึงข้อมูล user จาก realtime database.
    }
    const router = useRouter();
    return (
        //flex flex-col-2 w-full rounded-2xl border border-2-black
        <div className="flex flex-col-2 m-auto bg-slate-50 rounded-md ">

            <div className=" flex justify-center w-1/2 sm:w-1/4 rounded-l-2xl">
                <Image src={covid} alt='' width={500} />
            </div>

            <div className="px-10 py-10 flex flex-col w-1/2 justify-center items-center bg-green-500 ">
                <div className="">
                    <Image className=' object-none' width={160} src={psu_logo} alt="Logo" />
                </div>

                <div className="w-ful items-center">
                    <p className=' font-work_sans font-bold mt-10 text-center'>PSU COVID REPORT</p>
                    <p className=' font-work_sans font-light text-gray-500 text-sm mb-10'>This website for get covid report from PSU students</p>
                </div>

                <input onChange={(e) => setPsuPassport(e.target.value)} type="text" className='  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg' placeholder='PSU Passport Account Name: ' />
                <input onChange={(e) => setPassword(e.target.value
                )} type="password" className=' mt-4  w-1/2 font-work_sans font-semibold px-2 py-2 border border-gray-200 rounded-lg ' placeholder='Password' />



                <button onClick={() => handleSubmit()} className='mt-4 font-work_sans font-bold bg-[#009CDE] sm:bg-red-400 px-2 py-3 rounded-2xl text-white w-1/2'>LOGIN</button>




            </div>
        </div>
    )
}

export default LoginForm
