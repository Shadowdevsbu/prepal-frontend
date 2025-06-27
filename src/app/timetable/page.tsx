// src/app/timetable/page.tsx
"use client"; 

import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import { MdAdd, MdAccessTime, MdCalendarToday } from 'react-icons/md'; 
import React, { useState } from 'react'; 

export default function TimetablePage() {
  const [showIllustration, setShowIllustration] = useState(true);

  const handleCreatePlanClick = () => {
    setShowIllustration(false); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleCreatePlanClick} 
            className="flex items-center bg-purple-1 text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200"
          >
            Create plan +
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/bell.svg"
                alt="Notifications"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/profile-placeholder.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="transition-opacity duration-500 ease-in-out">
          {showIllustration ? (
            <div className="opacity-100 bg-white rounded-lg p-8 flex flex-col items-center justify-center max-w-2xl mx-auto my-auto">
              <div className="relative w-full mb-8">
                <Image
                  src="/find.jpg" 
                  alt="Timetable Illustration"
                  width={400}
                  height={250}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          ) : (
            <div className="opacity-100 bg-white rounded-4xl p-8 max-w-2xl mx-auto my-auto min-h-[500px]"> 
              <h2 className="text-3xl font-bold text-black mb-6 text-center">Create Plan</h2>

              {/* Study Date Section */}
              <div className="mb-4">
                <label htmlFor="studyDate" className="block text-sm font-medium text-gray-700 mb-2">Study Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="studyDate"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#6D6BA7] focus:border-[#6D6BA7] pl-10" // Added pl-10 for icon space
                  />
                  <MdCalendarToday className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="1.2em" />
                </div>
              </div>

              {/* Study Time Section */}
              <div className="mb-6">
                <label htmlFor="studyTime" className="block text-sm font-medium text-gray-700 mb-2">Study Time</label>
                <div className="relative">
                  <input
                    type="time"
                    id="studyTime"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#6D6BA7] focus:border-[#6D6BA7] pl-10" // Added pl-10 for icon space
                  />
                  <MdAccessTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="1.2em" />
                </div>
              </div>

              {/* Course and Topic Buttons */}
              <div className="flex space-x-4 mb-8">
                <button className="flex items-center bg-[#F0F0F0] text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors duration-200 text-sm">
                  <MdAdd size="1em" className="mr-2" /> Add Course
                </button>
                <button className="flex items-center bg-[#F0F0F0] text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors duration-200 text-sm">
                  <MdAdd size="1em" className="mr-2" /> Add Topic
                </button>
              </div>

              {/* "Create Plan" Button at the bottom */}
              <div className="flex justify-center mt-auto pt-8"> {/* mt-auto to push to bottom if content is short */}
                <button className="bg-purple-1 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 text-lg">
                  Create Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}