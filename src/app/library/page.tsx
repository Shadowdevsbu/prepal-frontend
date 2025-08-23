'use client';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import { HiViewGrid } from 'react-icons/hi';
// import { FaListUl } from 'react-icons/fa6';
import UserNotificationBell from '@/app/components/UserNotificationBell';


// const LibraryCard = () => {
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

//   const toggleViewMode = () => {
//     setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
//   };

export default function LibraryPage() {
  const [isCollapsed, setIsCollapsed] = useState(false); // ✅ define it here
  const notificationCount = 5;
  const [resources, setResources] = useState<responseInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [showDetail, setShowDetail] = useState<Boolean>(false);
  const [myResources, setViewMyResources] = useState<Boolean>(false);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);


  const getAllResources = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("learning-resources/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch resources");
      }

      setResources(res.data);
    } catch (error) {
      setResources([]);
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getAllResources();
    }
  }, [openModal, myResources, token]);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-1 p-8 bg-gray-100 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center bg-[#6D6BA7] text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200">
            Upload resources +
          </button>
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

        {/* Library content */}
        <LibraryCard />
      </main>
    </div>
  );
}