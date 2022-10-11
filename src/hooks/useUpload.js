import { useState } from "react";
import app from '../config/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
// import { useEffect } from "react";


export const useUpload = (file) => {
    const [uploadPerc, setUploadPerc] = useState(0);
    const [url, setUrl] = useState('');


    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
                setUploadPerc(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
            }
        );
    }
    useEffect(() => {
        file && uploadFile(file)
    }, [file])
    console.log(url);
    return { uploadPerc, url }
}
