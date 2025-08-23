'use client';
import ProtectedRoute from "@/app/ProtectedRoute";
import { axios } from "@/lib/api/axios";
import { useEffect, useState } from "react";
import { BiData, BiLoaderCircle } from "react-icons/bi";

interface viewResourceInterface {
    onClose: () => void
}

interface responseInterface {
    id: string,
    materialType: string,
    description: string,
    level: string,
    materialUrl: string
}

export const ViewResourceModal: React.FC<viewResourceInterface> = ({ onClose }) => {
    const [resources, setResources] = useState<responseInterface[]>([]);
    const token = localStorage.getItem('access_token');
    const [loading, setLoading] = useState<Boolean>(false);
    const [deleting, setIsDeleting] = useState<Boolean>(false);

    const getResources = async () => {
        setLoading(true);
        try {
            const res = await axios.get('learning-resources', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status !== 200) {
                throw new Error('Failed to fetch resources');
            }

            const resourcesData = res.data;
            setResources(resourcesData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const res = await axios.delete(`/learning-resources/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                const filtered = resources.filter(resource => resource.id !== id);
                setResources(filtered);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };


    useEffect(() => {
        getResources();
    }, [])

    return (
        <ProtectedRoute>

            <div className="rounded-lg shadow-md p-6 flex flex-col justify-between absolute inset-0 w-full h-full bg-black/50 text-black">
                {
                    loading ? <div className='flex flex-col items-center justify-center m-auto w-full lg:w-1/2 h-full bg-white p-8 rounded-lg gap-8 overflow-x-auto'><BiLoaderCircle size={30} className="animate-spin" /></div> :
                        <div className='flex flex-col m-auto w-full lg:w-1/2 md:full h-full bg-white p-8 rounded-lg gap-8 overflow-x-auto'>
                            <div className='flex flex-col gap-1'>
                                <h3 className='font-bold'>My Resources</h3>
                                <p className='text-gray-600 text-sm'>View all resources you have uploaded to the library.</p>
                            </div>
                            <div>
                                {(resources.length > 0 ? (<div className="flex flex-col gap-5"> {
                                    resources.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-2 border border-gray-200 p-5 rounded-md">
                                            <div className="flex items-center text-sm gap-2">
                                                <span className="bg-gray-200 py-1 px-2 rounded-2xl">{item.materialType}</span>
                                                <span className="bg-transparent border border-gray-200 py-1 px-2 rounded-2xl">{item.level}</span>
                                            </div>
                                            <h4 className="text-base font-bold">{item.description}</h4>
                                            <p className="text-gray-500 text-sm">File: {item.materialUrl}</p>
                                            <button type="button" className={`${deleting ? "bg-red-200 text-gray-700 animate-pulse" : "bg-red-500 text-gray-700"} text-sm font-bold p-2 w-max rounded-lg`} onClick={() => handleDelete(item.id)}>{deleting ? "Deleting..." : "Delete Resource"}</button>
                                        </div>

                                    ))}
                                </div>)
                                    : <div>
                                        You don't have any uploaded resources
                                    </div>
                                )}
                            </div>
                            <button type='button' onClick={onClose} className='bg-gray-300 p-2 w-max rounded-lg place-self-center text-sm'>Close</button>
                        </div>
                }
            </div>

        </ProtectedRoute>
    )
}
