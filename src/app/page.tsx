// src/app/page.tsx
import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import TimetableCard from './components/TimeTableCard';
import StudyPalCard from './components/StudyPalCard';
import LibraryCard from './components/LibraryCard';
import ForumCard from './components/ForumCard';


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

  const todayEntry = {
    time: createScheduledTime(today, 10, 0), 
    courseTitle: 'Calculus I',
    courseCode: 'MAT 201',
    profilePhotos: ['/avatar-1.png', '/avatar-2.png'],
  };

  const tomorrowEntry = {
    time: createScheduledTime(tomorrow, 9, 0),
    courseTitle: 'Linear Algebra',
    courseCode: 'MAT 202',
    profilePhotos: ['/avatar-2.png'],
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
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image src="/profile-placeholder.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <TimetableCard title="Today's Timetable" date={formattedTodayDate} entry={todayEntry} />
          <TimetableCard title="Tomorrow's Timetable" date={formattedTomorrowDate} entry={tomorrowEntry} />
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