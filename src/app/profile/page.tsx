// src/app/profile/page.tsx
'use client';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import UserNotificationBell from '@/app/components/UserNotificationBell';
import { RiPencilLine } from 'react-icons/ri';
import { FaFire } from 'react-icons/fa';

export default function ProfilePage() {
    const [profileName, setProfileName] = useState('');
    const [profilePassword, setProfilePassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('/ps.png'); 
    const [isCollapsed, setIsCollapsed] = useState(false);
    const notificationCount = 3;
    const streakCount = 15;

    const originalName = 'Olamiposi Akande';
    const originalPassword = '**********';
    const originalPicture = '/ps.png';

    const handleCancel = () => {
        setProfileName('');
        setProfilePassword('');
        setProfilePicture(originalPicture);
    };

    const handleSave = () => {
        console.log('Saving changes:', {
            name: profileName,
            password: profilePassword,
            picture: profilePicture,
        });
    };
    
    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePicture(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                {/* Header Section */}
                <div className="flex justify-end items-center mb-8">
                    <div className="flex items-center space-x-6">
                        <UserNotificationBell notificationCount={notificationCount} />
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                            <Image src="/ps.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Profile Info Card */}
                <div className="bg-white rounded-xl p-6 flex flex-col items-center max-w-2xl mx-auto my-auto min-h-[400px]">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-3xl font-bold text-black text-center flex-1">
                            Profile Info
                        </h2>
                        <div className="flex items-center space-x-2 bg-[#6D6BA7] text-white px-3 py-1.5 rounded-full shadow-sm">
                            <FaFire className="text-white" size={20} />
                            <span className="text-lg font-bold">{streakCount}</span>
                        </div>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="w-full space-y-6 flex flex-col items-center mt-6">
                        {/* Profile Picture Section */}
                        <div className="relative w-40 h-40 rounded-full mb-4">
                             <Image
                                src={profilePicture}
                                alt="Profile Picture"
                                width={160}
                                height={160}
                                className="w-full h-full rounded-full object-cover border-4 border-gray-300"
                            />
                            <label htmlFor="profile-picture-upload" className="absolute bottom-1 right-1 p-2 bg-white rounded-full border border-gray-300 shadow-md cursor-pointer">
                                <MdCameraAlt size={20} className="text-gray-600" />
                                <input
                                    id="profile-picture-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Name Input Field with Placeholder and Pencil Icon */}
                        <div className="w-[80%] relative">
                            <input
                                type="text"
                                id="profileName"
                                placeholder={originalName}
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full p-4 pl-6 pr-12 border-1 border-gray-300 rounded-3xl outline-none bg-gray-100 text-black font-semibold placeholder-gray-500"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                <RiPencilLine size={20} className="text-[#6D6BA7]" />
                            </div>
                        </div>
                        
                        {/* Password Input Field with Placeholder and Pencil Icon */}
                        <div className="w-[80%] relative">
                            <input
                                type="password"
                                id="profilePassword"
                                placeholder={originalPassword}
                                value={profilePassword}
                                onChange={(e) => setProfilePassword(e.target.value)}
                                className="w-full p-4 pl-6 pr-12 border-1 border-gray-300 rounded-3xl outline-none bg-gray-100 text-black font-semibold placeholder-gray-500"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                <RiPencilLine size={20} className="text-[#6D6BA7]" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mt-8 pt-4 w-full">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 text-lg w-64"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#6D6BA7] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 text-lg w-64"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}