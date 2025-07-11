// src/components/TimetableCard.tsx
"use client"; 

import { MdOutlineMoreVert, MdAccessTime, MdArrowForward, MdDelete } from 'react-icons/md'; 
import React, { useState } from 'react'; 
import Image from 'next/image';
import Link from 'next/link'; 

interface TimetableEntry {
  time: Date;
  courseTitle: string;
  courseCode: string;
  profilePhotos: string[];
}

interface TimetableCardProps {
  id: string; 
  title: string;
  date: string;
  entry: TimetableEntry | null;
  onDelete: (id: string) => void; 
}

const TimetableCard: React.FC<TimetableCardProps> = ({ id, title, date, entry, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);


  if (!entry) {
    return null;
  }

  const formattedTime = entry.time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Lagos',
  });

  const handleDeleteClick = () => {
    onDelete(id); 
    setOpenMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-[#2C2B54]">{title}</h2>
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <MdOutlineMoreVert size="1.5em" />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <button
                onClick={handleDeleteClick}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <MdDelete className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{date}</p>

      <div className="flex items-start text-gray-600 mb-3">
        <span className="mr-2 flex-shrink-0 py-1.1">
          <MdAccessTime size="1.3em" className='' />
        </span>
        <div className="flex-grow">
          <span className="text-sm font-medium">{formattedTime}</span>
          <p className="font-semibold text-gray-800 text-base mt-1">{entry.courseTitle}</p>
          <p className="text-xs text-gray-500">{entry.courseCode}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-4">
        <div className="flex -space-x-2 overflow-hidden px-6">
          {entry.profilePhotos.map((photo, photoIndex) => (
            <Image
              key={photoIndex}
              src={photo}
              alt={`Profile ${photoIndex + 1}`}
              width={28}
              height={28}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
            />
          ))}
        </div>
       
        <Link href="/timetable" className="flex items-center text-[#6D6BA7] font-medium text-sm hover:underline">
          View All
          <span className="ml-1">
            <MdArrowForward size="1em" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TimetableCard;