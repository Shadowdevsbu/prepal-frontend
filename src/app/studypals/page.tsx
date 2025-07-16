'use client';

import React, { useState } from 'react';

import Sidebar from '@/app/components/Sidebar';
import { MdSearch, MdDelete } from 'react-icons/md';
import UserNotificationBell from '@/app/components/UserNotificationBell'; 

interface StudyPal {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

export default function StudyPalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyPals, setStudyPals] = useState<StudyPal[]>([
    { id: 1, name: 'Alice', avatar: '/alice.jpg', status: 'online' },
    { id: 2, name: 'Bob', avatar: '/bob.jpg', status: 'offline' },
    { id: 3, name: 'Charlie', avatar: '/charlie.jpg', status: 'busy' },
    { id: 4, name: 'Diana', avatar: '/diana.jpg', status: 'online' },
  ]);

  const filteredStudyPals = studyPals.filter((pal) =>
    pal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePal = (id: number) => {
    setStudyPals(studyPals.filter((pal) => pal.id !== id));
  };


  const [notificationCount, setNotificationCount] = useState(3); 

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Study Pals</h1>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search study pals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6D6BA7] pr-10"
              />
              <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6D6BA7]" />
            </div>

            <UserNotificationBell notificationCount={notificationCount} />

            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/ps.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudyPals.length > 0 ? (
            filteredStudyPals.map((pal) => (
              <div
                key={pal.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#6D6BA7]">
                    <img
                      src={pal.avatar}
                      alt={pal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {pal.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        pal.status === 'online'
                          ? 'text-green-500'
                          : pal.status === 'offline'
                          ? 'text-gray-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {pal.status.charAt(0).toUpperCase() + pal.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeletePal(pal.id)}
                    className="w-8 h-8 rounded-md bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition"
                    aria-label={`Delete ${pal.name}`}
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No study pals found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}