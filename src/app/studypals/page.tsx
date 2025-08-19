'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '../ProtectedRoute';
import Header from './header';
import ToggleNav from './toggleNav';

export default function StudyPalsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <ProtectedRoute>
        {/* Sidebar with collapse control */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content that shifts with sidebar */}
        <main
          className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
            isCollapsed ? 'ml-20' : 'ml-64'
          }`}
        >
          {/* Header */}
          <Header />

          {/* Toggle Navigation for Sent / Received / Current */}
          <div className="mt-6">
            <ToggleNav />
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}