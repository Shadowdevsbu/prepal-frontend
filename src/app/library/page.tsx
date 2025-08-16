'use client';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import { HiViewGrid } from 'react-icons/hi';
// import { FaListUl } from 'react-icons/fa6';
import UserNotificationBell from '@/app/components/UserNotificationBell';
import ProtectedRoute from '../ProtectedRoute';
import UploadModal from '../components/UploadResourceModal';
import { ViewResourceModal } from '../components/ViewMyResourceModal';
import { BiLoaderCircle } from 'react-icons/bi';
import { axios } from '@/lib/api/axios';
import { FaArrowRight } from 'react-icons/fa6';


// const LibraryCard = () => {
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

//   const toggleViewMode = () => {
//     setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
//   };

//   return (
//     <div className="flex flex-col gap-10">
//       <div
//         className="flex bg-[#6D6BA7] self-end text-white w-fit p-1 rounded"
//         onClick={toggleViewMode}
//         style={{ cursor: 'pointer' }}
//       >
//         <div
//           className={`w-10 h-10 rounded flex items-center justify-center ${viewMode === 'grid' ? 'bg-white text-[#6D6BA7]' : 'bg-transparent'
//             }`}
//         >
//           <HiViewGrid className="w-7 h-7" />
//         </div>
//         <div
//           className={`w-10 h-10 rounded flex items-center justify-center ${viewMode === 'list' ? 'bg-white text-[#6D6BA7]' : 'bg-transparent'
//             }`}
//         >
//           <FaListUl className="w-7 h-7" />
//         </div>
//       </div>

//       <div
//         className={`grid ${viewMode === 'grid'
//           ? 'grid-cols-2 gap-10'
//           : 'grid-cols-1'
//           } gap-6 p-4 items-center justify-center`}
//       >
//         {libraryItems.map((item) => (
//           <div key={item.name}>
//             <a
//               href={item.link}
//               // This ensures the image and text are always stacked vertically and centered.
//               className={`flex flex-col gap-3 justify-center items-center`}
//             >
//               <Image
//                 src="/folder.png"
//                 alt={item.name}
//                 width={150}
//                 height={150}
//                 className="object-cover"
//               />
//               <h2 className="font-semibold text-lg text-center text-black">{item.name}</h2>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

interface responseInterface {
  id: string,
  materialType: string,
  description: string,
  level: string,
  materialUrl: string,
  user: {
    name: string
  }
}

export default function LibraryPage() {
  const notificationCount = 5;
  const [resources, setResources] = useState<responseInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [showDetail, setShowDetail] = useState<Boolean>(false);
  const [myResources, setViewMyResources] = useState<Boolean>(false);
  const token = localStorage.getItem('access_token');

  const getAllResources = async () => {
    setLoading(true);
    try {
      const res = await axios.get('learning-resources/all', {
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
      setResources([]);
      console.error("Error: ", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllResources();
  }, [openModal, myResources])
  
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen relative">
          <div className="flex justify-between items-center mb-8">
            <div className='flex items-center gap-5'>
              <button
                className="flex items-center bg-[#6D6BA7] hover:bg-transparent text-white  hover:text-[#6D6BA7] px-5 py-2 rounded-md font-medium hover:border-[#5C5A90]  transition-colors duration-200"
                onClick={() => { setOpenModal(!openModal) }}
              >
                Upload resources +
              </button>
              <button
                className="flex items-center border border-[#6D6BA7] text-[#6D6BA7] hover:text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200"
                onClick={() => { setViewMyResources(true) }}
              >
                View Your Resources
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <UserNotificationBell notificationCount={notificationCount} />
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/ps.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {
            loading ?
              <div className='flex items-center justify-center m-auto w-full h-full overflow-x-auto text-black'><BiLoaderCircle size={50} className="animate-spin" /></div>
              :
              <div className='flex flex-col text-black p-8 rounded-lg gap-8'>
                <div>
                  {(resources.length > 0 ? (<div className="flex flex-col gap-5"> {
                    resources.map((item, index) => (
                      <div key={index} className="flex items-center justify-between border border-gray-500 p-5 rounded-lg">
                        <div className='flex flex-col gap-2'>
                        <div className="flex items-center text-sm gap-2">
                          <span className="bg-gray-200 py-1 px-2 rounded-2xl">{item.materialType}</span>
                          <span className="bg-transparent border border-gray-400 py-1 px-2 rounded-2xl">{item.level} Level</span>
                        </div>
                        <h4 className="text-base font-bold">{item.description}</h4>
                        <p className="text-gray-500 text-sm">File: {item.materialUrl}</p>
                         <p className="text-gray-500 text-xs font-bold">Uploaded by: {item.user.name}</p>
                         </div>
                         <button type="button" className='flex items-center gap-2 text-sm  p-2 w-max rounded-lg text-gray-500 border border-gray-500 hover:rotate-3' onClick={()=>setShowDetail(true)}>View Details <FaArrowRight /></button>
                      </div>
                    ))}
                  </div>)
                    : <div className='text-black text-lg font-bold'>
                      There are no available resources
                    </div>
                  )}
                </div>

              </div>
          }

          {openModal && <UploadModal onClose={() => setOpenModal(false)} />}
          {myResources && <ViewResourceModal onClose={() => setViewMyResources(false)} />}
        </main>
      </div>
    </ProtectedRoute>
  );
}