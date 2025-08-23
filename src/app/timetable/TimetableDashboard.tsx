// src/app/components/TimetableDashboard.tsx
"use client";

import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Plus } from 'lucide-react';
import TimetableItemCard from './TimetableItemCard';
import { TimetableEntry } from './TimetableList';

interface TimetableDashboardProps {
  allTimetables: TimetableEntry[];
  todaysTimetables: TimetableEntry[];
  upcomingTimetables: TimetableEntry[];
  isLoading: boolean;
  onCreatePlanClick: () => void;
  onDeleteTimetable: (id: string) => Promise<void>;
}

type DashboardView = 'overview' | 'today' | 'upcoming' | 'all';

export default function TimetableDashboard({
  allTimetables,
  todaysTimetables,
  upcomingTimetables,
  isLoading,
  onCreatePlanClick,
  onDeleteTimetable
}: TimetableDashboardProps) {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  // Statistics
  const totalTimetables = allTimetables.length;
  const todaysCount = todaysTimetables.length;
  const upcomingCount = upcomingTimetables.length;
  const completedToday = 0; // You can implement this based on your completion tracking

  // Get the current data based on active view
  const getCurrentData = () => {
    switch (activeView) {
      case 'today':
        return todaysTimetables;
      case 'upcoming':
        return upcomingTimetables;
      case 'all':
        return allTimetables;
      default:
        return []; // Overview doesn't show a list
    }
  };

  const currentData = getCurrentData();

  // Statistics cards component
  const StatisticsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Plans</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalTimetables}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Today&#39;s Plans</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{todaysCount}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Upcoming Plans</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{upcomingCount}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Completed Today</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{completedToday}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <Plus className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation tabs component
  const NavigationTabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
      {[
        { key: 'overview', label: 'Overview', count: null },
        { key: 'today', label: 'Today', count: todaysCount },
        { key: 'upcoming', label: 'Upcoming', count: upcomingCount },
        { key: 'all', label: 'All Plans', count: totalTimetables }
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveView(tab.key as DashboardView)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
            activeView === tab.key
              ? 'bg-white text-purple-1 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>{tab.label}</span>
          {tab.count !== null && (
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeView === tab.key
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  // Quick actions component for overview
  const QuickActions = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onCreatePlanClick}
          className="bg-purple-1 text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Plan</span>
        </button>
        
        <button
          onClick={() => setActiveView('today')}
          className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200 flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>View Today&#39;s Plans</span>
        </button>

        <button
          onClick={() => setActiveView('upcoming')}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200 flex items-center space-x-2"
        >
          <Clock className="w-4 h-4" />
          <span>View Upcoming</span>
        </button>
      </div>
    </div>
  );

  // Today's highlight component for overview
  const TodaysHighlight = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today&#39;s Schedule</h3>
        {todaysCount > 3 && (
          <button
            onClick={() => setActiveView('today')}
            className="text-purple-1 text-sm font-medium hover:text-[#5C5A90] transition-colors"
          >
            View all ({todaysCount})
          </button>
        )}
      </div>

      {todaysTimetables.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No plans scheduled for today</p>
          <button
            onClick={onCreatePlanClick}
            className="text-purple-1 text-sm font-medium hover:text-[#5C5A90] transition-colors mt-2"
          >
            Create your first plan for today
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaysTimetables.slice(0, 4).map((timetable) => (
            <TimetableItemCard
              key={timetable.id}
              id={timetable.id}
              courseName={timetable.courseName}
              courseTitle={timetable.courseTitle}
              studyDate={timetable.studyDate}
              studyTime={timetable.studyTime}
              onDelete={onDeleteTimetable}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Content renderer based on active view
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 min-h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-1 mb-4"></div>
            <p className="text-xl">Loading your study plans...</p>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'overview':
        return (
          <>
            <QuickActions />
            <TodaysHighlight />
          </>
        );

      case 'today':
      case 'upcoming':
      case 'all':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeView === 'today' && 'Today\'s Study Plans'}
                {activeView === 'upcoming' && 'Upcoming Study Plans'}
                {activeView === 'all' && 'All Study Plans'}
              </h3>
              <span className="text-sm text-gray-500">
                {currentData.length} plan{currentData.length !== 1 ? 's' : ''}
              </span>
            </div>

            {currentData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="mb-4">
                  {activeView === 'today' && <Calendar className="w-16 h-16 mx-auto text-gray-300" />}
                  {activeView === 'upcoming' && <Clock className="w-16 h-16 mx-auto text-gray-300" />}
                  {activeView === 'all' && <BookOpen className="w-16 h-16 mx-auto text-gray-300" />}
                </div>
                <p className="text-lg mb-2">
                  {activeView === 'today' && 'No plans scheduled for today'}
                  {activeView === 'upcoming' && 'No upcoming plans'}
                  {activeView === 'all' && 'No study plans created yet'}
                </p>
                <p className="text-sm mb-4">
                  {activeView === 'today' && 'Create a plan to get started with today\'s studies'}
                  {activeView === 'upcoming' && 'Plan ahead for your future study sessions'}
                  {activeView === 'all' && 'Start organizing your study schedule'}
                </p>
                <button
                  onClick={onCreatePlanClick}
                  className="bg-purple-1 text-white px-6 py-2 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200"
                >
                  Create Plan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentData.map((timetable) => (
                  <TimetableItemCard
                    key={timetable.id}
                    id={timetable.id}
                    courseName={timetable.courseName}
                    courseTitle={timetable.courseTitle}
                    studyDate={timetable.studyDate}
                    studyTime={timetable.studyTime}
                    onDelete={onDeleteTimetable}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards - Always visible */}
      <StatisticsCards />

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
}