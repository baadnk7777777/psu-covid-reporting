import app from '@/utils/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getStorage, getDownloadURL, ref as storageRef, uploadBytesResumable, listAll } from 'firebase/storage';
import Image from 'next/image'

import ReportC from "../component/report";
import Modal from '@/component/Modal';
import { getApps } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

export const Dashboard = () => {
    const router = useRouter();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    const Fragment = React.Fragment;
    const [images, setImages] = useState<Images[]>([]);

    const storage = getStorage();

    type Images = {
        images_name: string;
        timestamp: string;
    }


    type Report = {
        psupassport: string;
        status: string;
        images_name: string;
        timestamp: string;
    }

    const [reportList, setReportList] = useState<Report[]>([]);
    const [totalPositive, setPositive] = useState("");
    const [totalNegative, setTotalNegative] = useState("");

    useEffect(() => {

        // if (user == "") {
        //     router.push("/");
        // }

        const database = getDatabase(app);
        const countRef = ref(database, 'student_report');
        onValue(countRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(snapshot.size);
            var countPositive = 0;
            var countNegative = 0;
            const ReportList: Report[] = [];

            snapshot.forEach((child => {
                if (child.val().status == "Positive") {
                    countPositive++;
                } else {
                    countNegative++;
                }
                const childData = child.val();
                //console.log(childData);
                ReportList.push({ ...childData });
            }));

            setPositive(countPositive.toString());
            setTotalNegative(countNegative.toString());
            setReportList(ReportList);

            // Fetch images after reportList is updated
            //fetchimages(ReportList);
        });



    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        router.push("/");
        return <div className="">Please sign In to continue ...</div>
    }

    const sortReport = () => {
        const sortedList = [...reportList].sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        setReportList(sortedList);
    }

    const handlesorting = () => {
        sortReport();
    }


    const viewImages = async (psupassport: string, imagesName: string) => {
        const queryParams = { psupassport, imagesName };
        const queryString = new URLSearchParams(queryParams).toString();
        const href = `/ViewImage?${queryString}`;

        await window.open(href, "_blank");
    }



    return (
        <div className="h-screen container px-4 mx-auto font-work_sans">
            <div className="flex flex-col-2 justify-around mt-24">
                <div className=" border border-gray-500 px-2 py-2 rounded-xl  shadow-md">
                    <p className=' font-bold text-sm text-start '>Total Positive</p>
                    <p className=' text-center mt-4 text-green-400 text-2xl font-bold'>{totalPositive}</p>
                </div>
                <div className="">
                    <div className=" border border-gray-500 px-2 py-2 rounded-xl  shadow-md">
                        <p className=' font-bold text-sm text-start '>Total Negative</p>
                        <p className=' text-center mt-4 text-red-400 text-2xl font-bold'>{totalNegative}</p>
                    </div>
                </div>
            </div>
            <div className="mt-24">
                <div className="flex bg-blue-400 text-white px-2 py-1 rounded-md mb-2 font-bold w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>

                    <button className=' ' onClick={() => handlesorting()}>Sorting</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#f5f6fb] px-4 py-5">
                    <table className='w-full text-sm text-center hidden sm:inline-table'>
                        <thead className=' uppercase bg-[#009CDE] text-white'>

                            <th scope='col' className='px-6 py-3'>
                                <div className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
                                    <p>Date</p>
                                </div>

                            </th >
                            <th scope='col' className='px-6 py-3'>
                                <div className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                    <p>Student ID</p>
                                </div>

                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Covid status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                <div className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <p>View</p>
                                </div>
                            </th>

                        </thead>
                        <tbody>
                            {
                                reportList.map((items, index) => (
                                    <tr key={index} className='hover:bg-gray-200 font-bold'>

                                        <td className='px-6 py-4'>
                                            {items.timestamp}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {items.psupassport}
                                        </td>
                                        <td className={`px-6 py-4 flex justify-center  ${items.status == "Positive" ? ' text-white' : 'text-white'}`}>
                                            <div className={` w-fit px-2 py-1 shadow-md drop-shadow-sm rounded-lg ${items.status == "Negative" ? 'bg-red-500' : 'bg-green-500'}`}>
                                                <p>{items.status}</p>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 '>
                                            <div className="flex justify-center">
                                                <div className=" w-fit flex px-4 py-2 justify-center items-center gap-2 bg-blue-500 text-white rounded-md shadow-md drop-shadow-sm ">

                                                    <button onClick={async () => await viewImages(items.psupassport, items.images_name)} className=''>ATK</button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                    </svg>
                                                </div>
                                            </div>

                                        </td>


                                    </tr>
                                ))
                            }



                        </tbody>
                    </table>

                    {
                        reportList.map((items, index) => (
                            <div key={index} className="mb-4 w-full flex justify-between px-4 py-4 bg-white rounded-lg shadow-sm drop-shadow-sm sm:hidden">
                                <div className=""><p>{items.psupassport}</p></div>
                                <div className=""><p>{items.timestamp}</p></div>
                                <div className=" text-indigo-500 font-bold"><p onClick={async () => await viewImages(items.psupassport, items.images_name)} >View</p></div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )

}

export default Dashboard;
