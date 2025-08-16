'use client';

import { axios } from '@/lib/api/axios';
import React, { useState } from 'react';

interface uploadModalInterface {
    onClose: () => void
}

const UploadModal: React.FC<uploadModalInterface> = ({ onClose }) => {
    const defaultFormDetails = {
        materialType: "",
        description: "",
        level: "",
        materialUrl: null as File | null
    }
    const materialType = ["Lecture Notes", "Textbook", "Assignment", "Reference Material", "Past Question", "Other"];
    const level = ["100", "200", "300", "400", "500", "600", "PG"];
    const token = localStorage.getItem('access_token');
    const [formDetails, setFormDetails] = useState(defaultFormDetails);
    const [loading, setLoading] = useState<Boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formDetails.materialUrl) {
                alert("Please upload a file");
                return;
            }

            const fileFormData = new FormData();
            fileFormData.append("file", formDetails.materialUrl);

            const uploadRes = await axios.post("/learning-resources/upload", fileFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (uploadRes.status !== 201) {
                throw new Error("File upload failed");
            }

            const { filePath } = uploadRes.data

            const resourcePayload = {
                fileType: "pdf",
                materialType: formDetails.materialType,
                description: formDetails.description,
                level: formDetails.level,
                materialUrl: filePath,
            };

            const createRes = await axios.post("/learning-resources/create", resourcePayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (createRes.status !== 201) {
                throw new Error("Resource creation failed");
            }
            onClose();
        } catch (error) {
            console.error("An unexpected error", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="rounded-lg shadow-md p-6 flex flex-col justify-between absolute inset-0 w-full h-full bg-black/60 text-black">
            <form action="" className='flex flex-col m-auto w-full lg:w-1/2 md:full h-full bg-white p-8 rounded-lg gap-8 overflow-x-auto'>
                <div className='flex flex-col gap-1'>
                    <h3 className='font-bold'>Upload New Resource</h3>
                    <p className='text-gray-600 text-sm'>Add a new academic resource to the library. Fill in all required fields.</p>
                </div>
                <div className='form-fields flex flex-col gap-5'>
                    <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="type">
                        Material Type

                        <select name="type" id="type" className='border-2 border-gray-300 outline-0 rounded-md p-2'
                            value={formDetails.materialType}
                            onChange={(e) => { setFormDetails({ ...formDetails, materialType: e.target.value }) }}
                        >
                            <option value="" disabled>
                                Select Level
                            </option>
                            {materialType.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="type">
                        Material Type
                        <select name="type" id="type" className='border-2 border-gray-300 outline-0 rounded-md p-2'
                            value={formDetails.level}
                            onChange={(e) => { setFormDetails({ ...formDetails, level: e.target.value }) }}
                        >
                            <option value="" disabled>
                                Select Level
                            </option>
                            {level.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="descriptipn">
                        Description
                        <textarea name="description" id="description" cols={30} rows={5} className='border-2 border-gray-300 outline-0 rounded-md p-2' value={formDetails.description} onChange={(e) => { setFormDetails({ ...formDetails, description: e.target.value }) }}></textarea>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="material">
                        File
                        <input type="file" name="material" id="material" className='border-2 border-gray-300 outline-0 rounded-md p-2' onChange={(e) => {
                            const selectedFile = e.target.files?.[0] || null;
                            setFormDetails({ ...formDetails, materialUrl: selectedFile });
                        }} />
                    </label>
                </div>
                <div className='action-buttons flex justify-between w-full'>
                    <button type='submit' onClick={handleSubmit} className={` p-2 w-max rounded-lg place-self-center text-sm text-white ${loading ? "bg-gray-300 animate-pulse" : "bg-purple-1"}`}>{loading ? "Uploading..." :
                        "Upload"}</button>
                    <button type='button' onClick={onClose} className='bg-gray-300 p-2 w-max rounded-lg place-self-center text-sm'>Close</button>
                </div>
            </form>

        </div>
    );
};

export default UploadModal;