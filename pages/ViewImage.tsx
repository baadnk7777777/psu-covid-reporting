import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getStorage, getDownloadURL, ref as storageRef, uploadBytesResumable, listAll } from 'firebase/storage';
import app from '@/utils/firebase';
import Image from 'next/image'

export const ViewImage = () => {

    const storage = getStorage(app);


    const [images, setImages] = useState("");


    const router = useRouter();

    const { psupassport } = router.query;
    const { imagesName } = router.query;

    useEffect(() => {
        console.log("Hello word2");



    }, []);

    const fetchData = async () => {
        console.log("data: " + psupassport);

        const imagesRef = storageRef(storage, `images/${psupassport}/${imagesName}`);
        console.log(imagesRef);
        getDownloadURL(imagesRef).then((url) => {
            setImages(url);
        }).catch((error) => {
            console.log(error);
        });
    }

    const [isShow, setIsShow] = useState(false);

    const handleShowImage = async () => {
        await fetchData();

        setIsShow(true);
        console.log("Hello word");
    }


    return (
        <div className='h-screen container px-4 mx-auto font-work_sans'>
            <div className="flex flex-col-2 justify-around mt-24">

                {isShow && <div className="border-4 border-black-600 shadow-sm drop-shadow-lg rounded-lg">
                    <Image loading="lazy" decoding="async" data-nimg="1" className="color: transparent" src={images} alt='' width={500} height={500} />
                    <p className=' px-5 py-5 font-bold'>{psupassport}</p>

                    {/* <p className=' px-5 py-5 font-bold'>{timestamp}</p> */}
                </div>
                }

            </div>
            <div className="flex flex-col justify-center items-center mt-24">
                {
                    !isShow && <button onClick={handleShowImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3">Show Image</button>
                }
            </div>

        </div>
    )
}

export default ViewImage;
