// src/app/page.tsx
"use client"; // Make it a client component

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import TimetableCard from './components/TimeTableCard';
import StudyPalCard from './components/StudyPalCard';
import LibraryCard from './components/LibraryCard';
import ForumCard from './components/ForumCard';
import { useState } from 'react'; // Import useState

// Define the type for the timetable entries managed in state
interface DashboardTimetableEntry {
  time: Date;
  courseTitle: string;
  courseCode: string;
  profilePhotos: string[];
}

export default function Home() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Lagos',
  };

  const formattedTodayDate = today.toLocaleDateString('en-US', options);
  const formattedTomorrowDate = tomorrow.toLocaleDateString('en-US', options);

  const createScheduledTime = (date: Date, hours: number, minutes: number): Date => {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0); 
    return d;
  };

  // State for today's and tomorrow's timetable entries, allowing them to be null
  const [todayEntry, setTodayEntry] = useState<DashboardTimetableEntry | null>({
    time: createScheduledTime(today, 10, 0), 
    courseTitle: 'Calculus I',
    courseCode: 'MAT 201',

    profilePhotos: ['/ps.png', '/aj.png'], 
  });

  const [tomorrowEntry, setTomorrowEntry] = useState<DashboardTimetableEntry | null>({
    time: createScheduledTime(tomorrow, 9, 0),
    courseTitle: 'Linear Algebra',
    courseCode: 'MAT 202',

    profilePhotos: ['/aj.png'], 
  });


  const handleDeleteDashboardTimetable = (id: string) => {
    if (id === 'today') {
      setTodayEntry(null);
    } else if (id === 'tomorrow') {
      setTomorrowEntry(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2C2B54]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/bell.svg"
                alt="Notifications"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {/* Assuming there's a notification count, uncomment this if needed */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span> */}
            </div>
           
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/ps.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" /> 
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <TimetableCard
            id="today" // Unique ID for this specific card
            title="Today's Timetable"
            date={formattedTodayDate}
            entry={todayEntry} // Pass the state variable
            onDelete={handleDeleteDashboardTimetable} // Pass the delete handler
          />
          <TimetableCard
            id="tomorrow" // Unique ID for this specific card
            title="Tomorrow's Timetable"
            date={formattedTomorrowDate}
            entry={tomorrowEntry} // Pass the state variable
            onDelete={handleDeleteDashboardTimetable} // Pass the delete handler
          />
          <div className='col-span-full'>
            <StudyPalCard />
          </div>
          <div className='col-span-full'>
            <LibraryCard />
          </div>
          <div className='col-span-full'>
            <ForumCard />
          </div>
        </div>
      </main>
    </div>
  );
}