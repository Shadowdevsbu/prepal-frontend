// src/components/LibraryCard.tsx
import React from 'react';
import { MdDescription, MdArrowForward } from 'react-icons/md'; 

const LibraryCard: React.FC = () => {
  const popularCourses = [
    "Introduction to Python",
    "Data Science Fundamentals",
    "Web Development Basics",
    "Digital Marketing Strategies"
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold text-[#2C2B54] mt-4">Library</h2>
        </div>


        <p className="text-sm text-black mb-4">
        </p>
        <div className="space-y-2 mb-4 font-medium text-black">
          {popularCourses.map((course, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2 text-[#6D6BA7]">
                <MdDescription size="1.2em" />
              </span>
              <span className="text-sm text-gray-700">{course}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center text-[#6D6BA7] font-medium text-sm hover:underline self-end"> 
        View All
        <span className="ml-1">
          <MdArrowForward size="1em" />
        </span>
      </button>
    </div>
  );
};

export default LibraryCard;