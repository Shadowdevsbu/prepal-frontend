'use client';
import { library } from '@/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import { FaListUl } from 'react-icons/fa6';

const LibraryCard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className="flex  bg-purple-1 self-end text-white w-fit p-1 rounded"
        onClick={toggleViewMode}
        style={{ cursor: 'pointer' }}
      >
        <div
          className={`w-10 h-10 rounded flex items-center justify-center bg-gray-200 ${
            viewMode === 'grid' ? 'bg-white text-purple-1' : ' bg-transparent'
          }`}
        >
          <HiViewGrid className="w-7 h-7" />
        </div>
        <div
          className={`w-10 h-10 rounded flex items-center justify-center  ${
            viewMode === 'list' ? 'bg-white text-purple-1' : ' bg-transparent'
          }`}
        >
          <FaListUl className="w-7 h-7" />
        </div>
      </div>
      <div
        className={`grid ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 gap-10'
            : 'grid-cols-1'
        } gap-6  p-4 items-center justify-center`}
      >
        {/* grid  */}
        {library.map((item) => (
          <div key={item.name}>
            <a
              href={item.link}
              className={`flex flex-col   gap-3  ${
                viewMode === 'grid' ? 'justify-center items-center' : ''
              }`}
            >
              <Image
                src="/folder.png"
                alt={item.name}
                width={200}
                height={200}
                className="object-cover"
              />
              <h2 className="font-semibold">{item.name}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryCard;
