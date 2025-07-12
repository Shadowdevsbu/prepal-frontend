// src/components/TimetableItemCard.tsx
import React, { useState } from 'react';
import { MdAccessTime, MdMoreVert, MdDelete } from 'react-icons/md';

interface TimetableItemCardProps {
  id: string; 
  courseName: string;
  courseTitle: string;
  studyDate: string; 
  studyTime: string; 
  onDelete: (id: string) => void; 
}

const TimetableItemCard: React.FC<TimetableItemCardProps> = ({ id, courseName, courseTitle, studyDate, studyTime, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);

 
  const dateObj = new Date(studyDate + 'T' + studyTime); 
  const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const formattedDayAndMonth = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleDeleteClick = () => {
    onDelete(id);
    setOpenMenu(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between relative">
      <div className="flex justify-between items-start mb-2">
   
        <h3 className="text-lg font-semibold text-gray-800">Today's Timetable</h3>
        
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <MdMoreVert size="1.5em" className="text-gray-500" />
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

    
      <div>
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <MdAccessTime className="mr-2 text-[#6D6BA7]" size="1.2em" />
          <span className="font-medium">{formattedTime}</span>
        </div>
        <p className="text-lg font-semibold text-[#2C2B54] mb-1">{courseName}</p>
        <p className="text-gray-500 text-sm">{courseTitle}</p> 
      </div>


      <div className="mt-4 text-right">
        <button className="text-[#6D6BA7] text-sm font-medium hover:underline flex items-center justify-end">
          View more <span className="ml-1 text-base">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default TimetableItemCard;