// src/app/components/TimetableList.tsx
"use client";

import React from 'react';
import TimetableItemCard from './TimetableItemCard';

export interface TimetableEntry {
  id: string;
  courseName: string;
  courseTitle: string;
  studyDate: string;
  studyTime: string;
  createdAt: number;
}

interface TimetableListProps {
  timetables: TimetableEntry[];
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  onCreatePlanClick: () => void;
}

export default function TimetableList({ 
  timetables, 
  onDelete, 
  isLoading = false,
  onCreatePlanClick 
}: TimetableListProps) {
  if (isLoading) {
    return (
      <div className="opacity-100">
        <h2 className="text-3xl font-bold text-[#2C2B54] mb-6 text-left">Your Study Timetables</h2>
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 min-h-[300px] flex items-center justify-center max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-1 mb-4"></div>
            <p className="text-xl">Loading your study plans...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="opacity-100">
      <h2 className="text-3xl font-bold text-[#2C2B54] mb-6 text-left">Your Study Timetables</h2>

      {timetables.length === 0 ? (
        <EmptyTimetableState onCreatePlanClick={onCreatePlanClick} />
      ) : (
        <TimetableGrid timetables={timetables} onDelete={onDelete} />
      )}
    </div>
  );
}

// Empty state component
function EmptyTimetableState({ onCreatePlanClick }: { onCreatePlanClick: () => void }) {
  return (
    <div className="bg-white rounded-xl p-8 text-center text-gray-500 min-h-[300px] flex items-center justify-center max-w-2xl mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <svg 
          className="w-16 h-16 text-gray-300 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-xl mb-4">No study plans created yet</p>
        <button
          onClick={onCreatePlanClick}
          className="bg-purple-1 text-white px-6 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200"
        >
          Create your first plan
        </button>
      </div>
    </div>
  );
}

// Grid component for displaying timetables
function TimetableGrid({ 
  timetables, 
  onDelete 
}: { 
  timetables: TimetableEntry[]; 
  onDelete: (id: string) => Promise<void> | void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {timetables.map((timetable) => (
        <TimetableItemCard
          key={timetable.id}
          id={timetable.id}
          courseName={timetable.courseName}
          courseTitle={timetable.courseTitle}
          studyDate={timetable.studyDate}
          studyTime={timetable.studyTime}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}