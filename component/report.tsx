import React from 'react'

type ReportProps = {
    report: {
        psupassport: string;
        status: string;
        images_name: string;
        timestamp: string;
    }
}
export const Report: React.FC<ReportProps> = ({ report }) => {
    return (
        <div className=" w-full text-center py-2 border-2 border-b-gray-500">
            <div className="flex gap-4">
                <h1 className=' w-full'>{report.timestamp}</h1>
                <h1 className=' w-full'>{report.psupassport}</h1>
                <h1 className='w-full'>{report.status}</h1>

            </div>
        </div>
    )
}
export default Report