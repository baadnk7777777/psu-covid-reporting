import { storage } from '@/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react'

export const Upload = () => {

    const [imagesFile, setImagesFile] = useState<File>();

    const handleSelectFile = (file: any) => {
        if (file[0].size < 1000000) {
            setImagesFile(file[0]);
            console.log(file[0]);
        } else {
            console.log("File size to large.");
        }
    }

    const handleUploadFile = () => {
        if (imagesFile) {
            const name = imagesFile.name;
            const storeRef = ref(storage, `images/s6330613005/${name}`);
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

    return (
        <div className="container mt-5">
            <div className="col-lg-8 offset-lg-2">
                <input type="file"
                    placeholder='Select file to upload'
                    accept='images/png'
                    onChange={(files) => handleSelectFile(files.target.files)}
                />
                <div className="">
                    <button onClick={handleUploadFile}>UploadFile</button>
                </div>
                <h5>{imagesFile && imagesFile.name}</h5>
            </div>
        </div>
    )
}

export default Upload
