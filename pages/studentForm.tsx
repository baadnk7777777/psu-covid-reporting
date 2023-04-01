import { storage } from '@/firebaseConfig';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from 'firebase/app';

import { getDatabase, set, ref as databaseRef, ref, push } from "firebase/database";
import app from '@/utils/firebase';
import { useRouter } from 'next/router';

export const studentForm = () => {
    const [imagesFile, setImagesFile] = useState<File>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [covidStatus, setCovidStatus] = useState("");

    const router = useRouter();

    const user = router.query.psuPassport || "";



    const handleSelectFile = (file: any) => {
        if (file[0].size < 1000000) {
            setImagesFile(file[0]);
            console.log(file[0]);
        } else {
            console.log("File size to large.");
        }
    }

    const handleUploadFile = async () => {

        if (selectedDate && covidStatus && imagesFile) {
            console.log(selectedDate);
            console.log(covidStatus);



            const database = getDatabase(app);

            const timestamp = selectedDate.toString();
            const date = new Date(timestamp);



            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            const formattedDate = `${day}/${month}/${year}`;
            console.log(formattedDate); // Output: "28/02/2023"


            const databaseRef2 = databaseRef(getDatabase(app), 'student_report/s6330613005');
            const newReportRef = push(databaseRef2);


            await set(newReportRef, {
                status: covidStatus,
                images_name: imagesFile.name,
                timestamp: formattedDate
            });

            console.log("Create Report Working function.")

            const name = imagesFile.name;
            const storeRef = storageRef(storage, `images/s6330613005/${name}`);
            const uploadTask = uploadBytesResumable(storeRef, imagesFile);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            )




        } else {
            console.log("File not found!!!");
        }
    }

    if (user == "") {
        router.push("/");
    }

    useEffect(() => {
        console.log(user);
    })

    return (
        <div className=" h-screen flex justify-center items-center container px-4 mx-auto">
            <div className="">
                <div className="w-full mt-4">
                    <DatePicker placeholderText='Choose Date' className=' w-full font-work_sans px-2 py-2  border border-gray-300 text-gray-900  rounded-lg'
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                    />
                </div>

                <div className="mt-4">

                    <select onChange={(event) => setCovidStatus(event.target.value)} className=' font-work_sans px-2 py-2  border border-gray-300 text-gray-900  rounded-lg w-full' id="">
                        <option value="">Choose a covid status</option>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                    </select>
                </div>
                <div className=" px-4 py-5 text-center w-full">
                    <label htmlFor="dropzone-file" className='flex flex-col items-center justify-center h-40 border-2 border-white border-dashed rounded-lg cursor-pointer bg-[#009CDE]'>
                        <div className="flex flex-col">
                            <p className=' font-work_sans font-bold mb-4 text-white'>{(imagesFile && imagesFile.name) ? imagesFile && imagesFile.name : "Click to upload"}</p>
                        </div>
                    </label>
                    <input id="dropzone-file" type="file" className="hidden"
                        onChange={(files) => handleSelectFile(files.target.files)}
                    />
                </div>
                <button className='font-work_sans bg-[#009CDE] px-2 py-3 text-white font-bold rounded-2xl w-full'
                    onClick={handleUploadFile}
                >Submit</button>
            </div>
        </div>
    )
}

export default studentForm
