'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { HiBell } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function StudyPalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyPals, setStudyPals] = useState([
    { id: 1, name: 'Emeka Anaru', field: 'Software Engineering', level: '300 Level', avatar: 'EA' },
    { id: 2, name: 'Angela Ibeh', field: 'Software Engineering', level: '200 Level', avatar: 'AI' },
    { id: 3, name: 'Tamuno David', field: 'Software Engineering', level: '300 Level', avatar: 'TD' },
    { id: 4, name: 'Grace Bello', field: 'Cybersecurity', level: '200 Level', avatar: 'GB' },
    { id: 5, name: 'Daniel Okoro', field: 'Information Systems', level: '100 Level', avatar: 'DO' },
  ]);

  const filteredPals = studyPals.filter(pal =>
    pal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pal.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pal.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setStudyPals(prev => prev.filter(pal => pal.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Study Pals</h1>
            <div className="flex items-center gap-4">
              {/* White Oval Search Container */}
              <div className="relative bg-white rounded-2xl px-4 py-2 shadow-sm w-64">
                <input
                  type="text"
                  placeholder="Search study pal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none w-full pr-8"
                />
                <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6D6BA7]" />
              </div>

              {/* Notification icon */}
              <a href="/notifications">
                <HiBell className="w-6 h-6 text-[#6D6BA7] cursor-pointer" />
              </a>

              {/* Profile Image */}
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/ps.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Study Pals List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredPals.length > 0 ? (
            filteredPals.map((pal) => (
              <div
                key={pal.id}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6D6BA7] flex items-center justify-center text-white font-bold text-sm">
                      {pal.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{pal.name}</h3>
                      <p className="text-gray-600 text-sm">{pal.field}</p>
                      <p className="text-gray-500 text-xs">{pal.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-white text-sm font-medium rounded-full hover:opacity-90"
                      style={{ backgroundColor: '#6D6BA7' }}
                    >
                      Study Request
                    </button>
                    <button
                      onClick={() => handleDelete(pal.id)}
                      className="w-8 h-8 rounded-md bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition"
                      aria-label={`Delete ${pal.name}`}
                    >
                      <FaRegTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No study pals found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
