'use client';

import React, { useState } from 'react';
import {
  HiViewGrid,
  HiUsers,
} from 'react-icons/hi';
import { FaRegCalendar, FaRegTrashAlt, FaRegFileAlt } from 'react-icons/fa';
import { IoMdChatboxes, IoMdSearch } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { PiHeadsetBold } from 'react-icons/pi';
import { GoBellFill } from 'react-icons/go';
import { BsChatLeftDots } from 'react-icons/bs';

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
    setStudyPals((prev) => prev.filter(pal => pal.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className="w-64 text-white relative"
        style={{ background: 'linear-gradient(to bottom, #6D6BA7, #5A5890)' }}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <BsChatLeftDots className="w-5 h-5" />
            <span className="text-xl font-bold">PrepPal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { icon: <HiViewGrid className="w-5 h-5" />, label: 'Dashboard' },
            { icon: <FaRegCalendar className="w-5 h-5" />, label: 'Timetable' },
            { icon: <HiUsers className="w-5 h-5" />, label: 'Study pals', active: true },
            { icon: <FaRegFileAlt className="w-5 h-5" />, label: 'Library' },
            { icon: <IoMdChatboxes className="w-5 h-5" />, label: 'Forums' },
            { icon: <CgProfile className="w-5 h-5" />, label: 'Profile' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                item.active
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-purple-200 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Help Icon */}
        <div className="absolute bottom-6 left-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
            <PiHeadsetBold className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 shadow-sm border-b border-transparent">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Study Pals</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search study pal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
                <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6D6BA7]" />
              </div>

              <div className="relative">
                <GoBellFill className="w-6 h-6 text-[#6D6BA7] cursor-pointer" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  4
                </div>
              </div>

              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                K
              </div>
            </div>
          </div>
        </div>

        {/* Study Pals List Section */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
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
        </div>
      </div>
    </div>
  );
}
