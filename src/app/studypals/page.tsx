// src/app/study-pals/page.tsx
'use client';

import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '../ProtectedRoute';
import Header from './header';
import GetSentPals from './get-sentPals';

export default function StudyPalsPage() {
  return (
    <div className="flex">
      <ProtectedRoute>
      <Sidebar />

      <main className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
          <Header />
          <GetSentPals />
      </main>
    </ProtectedRoute>
    </div>
  );
}