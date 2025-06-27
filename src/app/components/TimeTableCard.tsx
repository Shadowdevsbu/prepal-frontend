// src/components/TimetableCard.tsx
import { MdOutlineMoreVert, MdAccessTime, MdArrowForward } from 'react-icons/md';
import React from 'react';
import Image from 'next/image';

interface TimetableEntry {
  time: Date; 
  courseTitle: string;
  courseCode: string;
  profilePhotos: string[];
}

interface TimetableCardProps {
  title: string;
  date: string;
  entry: TimetableEntry; 
}

const TimetableCard: React.FC<TimetableCardProps> = ({ title, date, entry }) => {
  
  const formattedTime = entry.time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Lagos',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-[#2C2B54]">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <MdOutlineMoreVert size="1.5em" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">{date}</p>

      
      <div className="flex items-start text-gray-600 mb-3"> 
        <span className="mr-2 flex-shrink-0 py-1.1"> 
          <MdAccessTime size="1.3em" className='' />
        </span>
        <div className="flex-grow"> {/* This div will contain time, title, code */}
          <span className="text-sm font-medium">{formattedTime}</span>
          <p className="font-semibold text-gray-800 text-base mt-1">{entry.courseTitle}</p> 
          <p className="text-xs text-gray-500">{entry.courseCode}</p>
        </div>
      </div>

      {/* Profile Photos and View All Button */}
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
        <button className="flex items-center text-[#6D6BA7] font-medium text-sm hover:underline">
          View All
          <span className="ml-1">
            <MdArrowForward size="1em" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TimetableCard;