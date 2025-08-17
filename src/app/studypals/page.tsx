'use client';

import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '../ProtectedRoute';
import Header from './header';
import GetSentPals from './get-sentPals';
import GetReceivedPreppals from './get-receivedPals';

export default function StudyPalsPage() {
  return (
    <div className="flex">
      <ProtectedRoute>
        <Sidebar />

        <main className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
          {/* Header */}
          <Header />

          {/* Responsive preppals container */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sent Preppals (read-only) */}
            <div className="flex-1">
              <GetSentPals />
            </div>

            {/* Received Preppals (with Accept/Decline buttons) */}
            <div className="flex-1">
              <GetReceivedPreppals />
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </div>
  );
}