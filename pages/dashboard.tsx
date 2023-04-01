import app from '@/utils/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import ReportC from "../component/report";

export const dashboard = () => {

    type Report = {
        psupassport: string;
        status: string;
        images_name: string;
        timestamp: string;
    }

    const [reportList, setReportList] = useState<Report[]>([]);

    const router = useRouter();

    const user = router.query.user;
    const role = router.query.role;

    useEffect(() => {
        const database = getDatabase(app);
        const countRef = ref(database, 'student_report');
        onValue(countRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data);

            const ReportList: Report[] = [];

            snapshot.forEach((child => {
                const childData = child.val();
                console.log(childData);
                ReportList.push({ ...childData });
            }));
            setReportList(ReportList);
        });
    }, [])

    if (user == "") {
        router.push("/");
    }



    return (
        <table className="table-auto" >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Psu passport</th>
                    <th>Covid status</th>
                    <th>view</th>
                </tr>
            </thead>
            <tbody>
                {reportList ? reportList.map((item) => <ReportC report={item} />) : ""}

            </tbody>
        </table >
    )
}

export default dashboard;
