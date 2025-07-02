// src/app/timetable/page.tsx
"use client"; 
import Image from 'next/image';
import { MdAdd, MdAccessTime, MdCalendarToday } from 'react-icons/md'; 
import React, { useState } from 'react'; 

export default function TimetablePage() {
  const [showIllustration, setShowIllustration] = useState(true);

  const handleCreatePlanClick = () => {
    setShowIllustration(false); 
  };

  return (
    <div className="">
      <main className="">
      </main>
    </div>
  );
}