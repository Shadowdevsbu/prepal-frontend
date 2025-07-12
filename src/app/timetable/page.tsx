// src/app/timetable/page.tsx
"use client"; 

import Sidebar from '../components/UserSidebar';
import Image from 'next/image';
import { MdAdd } from 'react-icons/md'; 
import React, { useState, useEffect, useCallback } from 'react'; 
import TimetableItemCard from '../components/TimetableItemCard'; 


interface TimetableEntry {
  id: string;
  courseName: string;
  courseTitle: string;
  studyDate: string;
  studyTime: string;
  createdAt: number;
}

type DisplayMode = 'illustration' | 'form' | 'timetables';

export default function TimetablePage() {
  // State to manage which content section is displayed
  const [displayMode, setDisplayMode] = useState<DisplayMode>('illustration');
  const [prevDisplayMode, setPrevDisplayMode] = useState<DisplayMode>('illustration'); 
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // States for form inputs
  const [courseName, setCourseName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [studyDate, setStudyDate] = useState('');
  const [studyTime, setStudyTime] = useState('');

  // State to store the list of timetables
  const [timetables, setTimetables] = useState<TimetableEntry[]>([]);

  // Function to load timetables from localStorage
  const loadTimetables = useCallback(() => {
    const storedTimetables = localStorage.getItem('userTimetables');
    if (storedTimetables) {
      const parsedTimetables: TimetableEntry[] = JSON.parse(storedTimetables);
      const sortedTimetables = parsedTimetables.sort((a, b) => b.createdAt - a.createdAt);
      setTimetables(sortedTimetables);
      return sortedTimetables.length > 0;
    } else {
      setTimetables([]);
      return false; 
    }
  }, []);

  // Effect to determine initial display mode and load timetables
  useEffect(() => {
    if (isInitialLoad) {
      const hasTimetables = loadTimetables();
      if (hasTimetables) {
        setDisplayMode('timetables');
      } else {
        setDisplayMode('illustration');
      }
      setIsInitialLoad(false); 
    } else if (displayMode === 'timetables') {
      loadTimetables();
    }
  }, [displayMode, isInitialLoad, loadTimetables]);


  // Handler for the top "Create plan +" button (shows the form)
  const handleCreatePlanClick = () => {
    setPrevDisplayMode(displayMode); // Store current mode before going to form
    setDisplayMode('form');
  };

  // Handler for deleting a timetable entry
  const handleDeleteTimetable = (id: string) => {
    const updatedTimetables = timetables.filter(item => item.id !== id);
    localStorage.setItem('userTimetables', JSON.stringify(updatedTimetables));
    setTimetables(updatedTimetables);

    // If all timetables are deleted, switch back to illustration
    if (updatedTimetables.length === 0) {
      setDisplayMode('illustration');
    }
  };

  // Handler for the form's "Create Plan" button (saves data and shows timetables)
  const handleCreateNewPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    // Basic validation
    if (!courseName || !courseTitle || !studyDate || !studyTime) {
      alert('Please fill in all fields!');
      return;
    }

    const newTimetableEntry: TimetableEntry = {
      id: Date.now().toString(), 
      courseName,
      courseTitle,
      studyDate,
      studyTime,
      createdAt: Date.now(), 
    };

    const storedTimetables = localStorage.getItem('userTimetables');
    const currentTimetables: TimetableEntry[] = storedTimetables ? JSON.parse(storedTimetables) : [];

    const updatedTimetables = [...currentTimetables, newTimetableEntry];

    localStorage.setItem('userTimetables', JSON.stringify(updatedTimetables));

    setCourseName('');
    setCourseTitle('');
    setStudyDate('');
    setStudyTime('');

    loadTimetables(); 
    setDisplayMode('timetables');
  };

  // Handler for the Cancel button
  const handleCancelClick = () => {
    setDisplayMode(prevDisplayMode); 
    setCourseTitle('');
    setStudyDate('');
    setStudyTime('');
  };

  // Render nothing until the initial load check is complete
  if (isInitialLoad) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
          Loading timetables...
        </main>
      </div>
    ); 
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        {/* Page Header */}
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
              <Image src="/ps.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

       
        <div className="transition-opacity duration-500 ease-in-out">
          {displayMode === 'illustration' && (
            <div className="opacity-100 bg-white rounded-xl p-8 flex flex-col items-center justify-center max-w-2xl mx-auto my-auto">
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
          )}

          {displayMode === 'form' && (
            <form onSubmit={handleCreateNewPlanSubmit} className="opacity-100 bg-white rounded-xl p-8 max-w-2xl mx-auto my-auto min-h-[500px] flex flex-col">
              <h2 className="text-3xl font-bold text-black mb-6 text-center">Create Plan</h2>

              <div className="mb-4">
                <label htmlFor="courseName" className="block text-lg font-semibold text-gray-900 mb-2">Course Name</label>
                <div className="relative">
                  <input type="text" 
                  id="courseName"
                  className="w-full p-3 border-1 border-purple-1 rounded-3xl outline-none text-black"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required 
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="courseTitle" className="block text-lg font-semibold text-gray-900 mb-2">Course Title</label>
                <div className="relative">
                  <input
                    type="text"
                    id="courseTitle"
                    className="w-full p-3 border-1 border-purple-1 rounded-3xl outline-none text-black" 
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Study Date and Study Time */}
              <div className='flex gap-4 mb-6'>
                <div className="flex-1">
                  <label htmlFor="studyDate" className="block text-lg font-semibold text-gray-900 mb-2">Study Date</label>
                  <div>
                    <input 
                      type="date"
                      id="studyDate"
                      placeholder='Use Calendar'
                      className='w-full p-3 border-1 border-purple-1 rounded-full outline-none text-black placeholder-gray-500'
                      value={studyDate}
                      onChange={(e) => setStudyDate(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label htmlFor="studyTime" className="block text-lg font-semibold text-gray-900 mb-2">Study Time</label>
                  <div>
                    <input 
                      type="time"
                      id="studyTime"
                      placeholder='Use Time...'
                      className='w-full p-3 border-1 border-purple-1 rounded-full outline-none text-black placeholder-gray-500'
                      value={studyTime}
                      onChange={(e) => setStudyTime(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* "Create Plan" and "Cancel" buttons */}
              <div className="flex justify-center gap-4 mt-auto pt-8">
                <button
                  type="submit"
                  className="bg-purple-1 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 text-lg w-64"
                >
                  Create Plan
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200 text-lg w-64"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {displayMode === 'timetables' && (
            <div className="opacity-100">
              <h2 className="text-3xl font-bold text-[#2C2B54] mb-6 text-left">Your Study Timetables</h2>
              
              {timetables.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500 min-h-[300px] flex items-center justify-center max-w-2xl mx-auto">
                  <p className="text-xl">No study plans created yet. Click "Create plan +" to add one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {timetables.map((timetable) => (
                    <TimetableItemCard
                      key={timetable.id}
                      id={timetable.id}
                      courseName={timetable.courseName}
                      courseTitle={timetable.courseTitle}
                      studyDate={timetable.studyDate}
                      studyTime={timetable.studyTime}
                      onDelete={handleDeleteTimetable}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}