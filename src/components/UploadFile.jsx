import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useFormikContext } from 'formik';

export default function UploadFile({ name }) { // Accept name prop to handle Formik field name
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const { setFieldValue } = useFormikContext(); // Access Formik's setFieldValue

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            toast.warning('Please select a file first!');
            return;
        }

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                toast.error("Upload failed");
                console.error("Upload failed:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFieldValue(name, url); // Update Formik's state with the download URL
                    toast.success('File uploaded successfully');
                });
            }
        );
    };

    return (
        <div className="mb-3">
            <p className="mb-0 small">Product image</p>
            <MDBInput type="file" onChange={handleFileChange} /> {/* Handle file change */}
            <MDBBtn size="sm" onClick={handleUpload} block className="mt-3">Upload</MDBBtn>
            {progress > 0 && <p>Progress: {progress}%</p>}
        </div>
    );
}
