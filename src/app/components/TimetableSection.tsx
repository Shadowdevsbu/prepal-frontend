// src/components/TimetableSection.tsx
import React, { useState } from 'react';
import { MdAccessTime, MdMoreVert, MdDelete } from 'react-icons/md'; // Added MdMoreVert and MdDelete

interface TimetableEntry {
  id: string;
  courseName: string;
  courseTitle: string; // Used as Course Code for display
  studyDate: string; // YYYY-MM-DD
  studyTime: string; // HH:MM
  createdAt: number;
}

interface TimetableSectionProps {
  entries: TimetableEntry[];
  onDelete: (id: string) => void;
}

const TimetableSection: React.FC<TimetableSectionProps> = ({ entries, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDeleteClick = (id: string) => {
    onDelete(id);
    setOpenMenuId(null); 
  };

  if (entries.length === 0) {
    return null;
  }

  

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#2C2B54]">My Created Study Plans</h3>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => {
          const dateObj = new Date(entry.studyDate + 'T' + entry.studyTime);
          const displayTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

          return (
            <div key={entry.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 relative">
              <div className="flex items-center">
                <MdAccessTime className="text-gray-500 mr-3" size="1.2em" />
                <div>
                  <p className="text-gray-800 font-medium">{displayTime}</p>
                  <p className="text-gray-500 text-xs">{displayDate}</p>
                </div>
              </div>
              <div className="flex-1 ml-4">
                <p className="text-gray-800 font-medium">{entry.courseName}</p>
                <p className="text-gray-500 text-sm">{entry.courseTitle}</p> 
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleMenu(entry.id)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <MdMoreVert size="1.5em" className="text-gray-500" />
                </button>
                {openMenuId === entry.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <button
                      onClick={() => handleDeleteClick(entry.id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <MdDelete className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimetableSection;