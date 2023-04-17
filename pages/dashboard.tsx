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

        sortData();

    }, []);

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user) {
        router.push("/");
        return <div className="">Please sign In to continue ...</div>
    }

    function sortData() {
        const sortedList = [...reportList].sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        setReportList(sortedList);
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#f5f6fb] px-4 py-5">
                    <table className='w-full text-sm text-center hidden sm:inline-table'>
                        <thead className=' uppercase bg-[#009CDE] text-white'>
                            <th scope='col' className='px-6 py-3'>
                                Date
                            </th >
                            <th scope='col' className='px-6 py-3'>
                                Student ID
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Covid status
                            </th>
                            <th scope='col' className='px-6 py-3'>View</th>
                        </thead>
                        <tbody>
                            {
                                reportList.map((items, index) => (
                                    <tr key={index} className='hover:bg-gray-50 font-bold'>

                                        <td className='px-6 py-4'>
                                            {items.timestamp}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {items.psupassport}
                                        </td>
                                        <td className={`px-6 py-4 ${items.status == "Positive" ? ' text-green-400' : 'text-red-400'}`}>
                                            {items.status}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <button onClick={async () => await viewImages(items.psupassport, items.images_name)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>ATK</button>
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







                    {/* <div className=" w-full text-sm text-center sm:hidden">
                        {
                            reportList.map((items, index) => (
                                <><div className="flex flex-col justify-center items-center mt-4">
                                    <p className='w-1/2 bg-blue-500 text-white text-md font-bold rounded-md'>DATE</p>
                                    <p className=' text-md my-2'>{items.timestamp}</p>
                                </div><div className="flex flex-col justify-center items-center">
                                        <p className='w-1/2 bg-blue-500 text-white text-md font-bold rounded-md'>STUDENT ID</p>
                                        <p className=' text-md my-2'> {items.psupassport}</p>
                                    </div><div className="flex flex-col justify-center items-center">
                                        <p className='w-1/2 bg-blue-500 text-white text-md font-bold rounded-md'>COVID STATUS</p>
                                        <p className=' text-md my-2'>{items.status}</p>
                                    </div><div className="flex flex-col justify-center items-center">
                                        <p className='w-1/2 bg-blue-500 text-white text-md font-bold rounded-md'>VIEW</p>
                                        <button onClick={async () => await viewImages(items.psupassport, items.images_name)} className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>ATK</button>
                                    </div></>
                            ))
                        }

                    </div> */}

                </div>
            </div>
        </div>
    )

}

export default Dashboard;
