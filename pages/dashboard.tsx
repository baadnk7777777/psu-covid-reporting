import app from '@/utils/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';

import ReportC from "../component/report";

export const Dashboard = () => {

    type Report = {
        psupassport: string;
        status: string;
        images_name: string;
        timestamp: string;
    }

    const [reportList, setReportList] = useState<Report[]>([]);
    const [totalPositive, setPositive] = useState("");
    const [totalNegative, setTotalNegative] = useState("");

    const router = useRouter();

    const user = router.query.user;
    const role = router.query.role;

    useEffect(() => {

        const database = getDatabase(app);
        const countRef = ref(database, 'student_report');
        onValue(countRef, (snapshot) => {
            const data = snapshot.val();
            console.log(snapshot.size);
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
                console.log(childData);
                ReportList.push({ ...childData });
            }));

            setPositive(countPositive.toString());
            setTotalNegative(countNegative.toString());
            setReportList(ReportList);
        });

        sortData();

        const fetchImages = async () => {

            let result = await storageRef.child('images').listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

            return Promise.all(urlPromises);

        }

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        }
        loadImages();

    }, [])

    if (user == "") {
        router.push("/");
    }

    function sortData() {
        const sortedList = [...reportList].sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        setReportList(sortedList);
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className='w-full text-sm text-center'>
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
                                reportList.map((items) => (
                                    <tr className='hover:bg-gray-50 font-bold'>

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
                                            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>ATK</button>
                                        </td>

                                    </tr>
                                ))
                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
