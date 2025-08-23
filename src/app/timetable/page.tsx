// src/app/timetable/page.tsx (Fixed Version)
"use client";

import Sidebar from '../components/Sidebar';
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../ProtectedRoute';

// Import components
import TimetableHeader from '../timetable/TimetableHeader';
import TimetableForm, { TimetableFormData } from '../timetable/TimetableForm';
import TimetableIllustration from '../timetable/TimetableIllustration';
import TimetableDashboard from '../timetable/TimetableDashboard';

// Import the enhanced hook
import { useTimetables } from '../timetable/hooks/useTimetables';

type DisplayMode = 'dashboard' | 'form' | 'illustration';

export default function TimetablePage() {
  // Use the enhanced custom hook
  const {
    timetables: allTimetables,
    todaysTimetables,
    upcomingTimetables,
    isLoading,
    error,
    isInitialized,
    createTimetable,
    deleteTimetable,
    clearError,
    loadTimetables,
  } = useTimetables({ 
    autoLoad: true,
    loadType: 'all' 
  });

  // UI state management
  const [displayMode, setDisplayMode] = useState<DisplayMode | null>(null); // Start with null
  const [prevDisplayMode, setPrevDisplayMode] = useState<DisplayMode>('illustration');

  // Notification count (connect to your notification API later)
  const [notificationCount] = useState(5);

<<<<<<< HEAD
  // Simple and reliable initialization logic
=======
  // State to store the list of timetables
  const [timetables, setTimetables] = useState<TimetableEntry[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Example for dynamic notification count (can be updated later)
  const [notificationCount, setNotificationCount] = useState(5); // Hardcoded for now

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
>>>>>>> 445755d13a807dd6b98f961da74e50b4950191b9
  useEffect(() => {
    console.log('DEBUG COMPONENT - isInitialized:', isInitialized);
    console.log('DEBUG COMPONENT - isLoading:', isLoading);
    console.log('DEBUG COMPONENT - allTimetables:', allTimetables);
    console.log('DEBUG COMPONENT - allTimetables.length:', allTimetables.length);
    
    // Only set display mode after hook is initialized and not loading
    if (isInitialized && !isLoading && displayMode === null) {
      const hasExistingTimetables = allTimetables && allTimetables.length > 0;
      console.log('DEBUG COMPONENT - Setting display mode. Has timetables:', hasExistingTimetables);
      setDisplayMode(hasExistingTimetables ? 'dashboard' : 'illustration');
    }
  }, [isInitialized, isLoading, allTimetables, displayMode]);

  // Event handlers
  const handleCreatePlanClick = () => {
    if (displayMode) {
      setPrevDisplayMode(displayMode);
    }
    setDisplayMode('form');
    clearError();
  };

  const handleFormSubmit = async (formData: TimetableFormData) => {
    try {
      await createTimetable(formData);
      setDisplayMode('dashboard');
      
      // Show success message
      showNotification('Study plan created successfully!', 'success');
    } catch (err) {
      console.error('Failed to create timetable:', err);
      showNotification(
        `Failed to create study plan: ${err instanceof Error ? err.message : 'Unknown error'}`, 
        'error'
      );
    }
  };

  const handleFormCancel = () => {
    setDisplayMode(prevDisplayMode);
    clearError();
  };

  const handleDeleteTimetable = async (id: string) => {
    if (!confirm('Are you sure you want to delete this study plan?')) {
      return;
    }

    try {
      await deleteTimetable(id);
      
      // If no timetables left, show illustration
      if (allTimetables.length === 1) { // Will be 0 after deletion
        setDisplayMode('illustration');
      }
      
      showNotification('Study plan deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete timetable:', err);
      showNotification(
        `Failed to delete study plan: ${err instanceof Error ? err.message : 'Unknown error'}`, 
        'error'
      );
    }
  };

  // Simple notification system (you can replace with a proper toast library)
  const showNotification = (message: string, type: 'success' | 'error') => {
    // For now, we'll use browser alerts, but you should implement a proper toast system
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else {
      // You can implement a success toast here
      console.log(`Success: ${message}`);
    }
  };

  // Refresh data handler
  const handleRefresh = async () => {
    try {
      await loadTimetables('all');
      showNotification('Data refreshed successfully!', 'success');
    } catch {
      showNotification('Failed to refresh data', 'error');
    }
  };

  // Error display component
  const ErrorDisplay = () => {
    if (!error) return null;

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-auto max-w-4xl">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-800 font-medium">Something went wrong</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleRefresh}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              title="Retry loading"
            >
              Retry
            </button>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 transition-colors"
              title="Dismiss error"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading screen - wait for initialization to complete
  if (!isInitialized || (isLoading && displayMode === null)) {
    return (
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-1 mb-6"></div>
            <p className="text-xl text-gray-600 mb-2">Loading your study plans...</p>
            <p className="text-sm text-gray-500">This may take a moment</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
          {/* Header Component */}
          <TimetableHeader 
            onCreatePlanClick={handleCreatePlanClick}
            notificationCount={notificationCount}
          />

          {/* Error Display */}
          <ErrorDisplay />

          {/* Main Content Area */}
          <div className="transition-all duration-500 ease-in-out">
            {displayMode === 'illustration' && (
              <div className="animate-fadeIn">
                <TimetableIllustration onCreatePlanClick={handleCreatePlanClick} />
              </div>
            )}

            {displayMode === 'form' && (
              <div className="animate-fadeIn">
                <TimetableForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  isLoading={isLoading}
                />
              </div>
            )}

            {displayMode === 'dashboard' && (
              <div className="animate-fadeIn">
                <TimetableDashboard
                  allTimetables={allTimetables}
                  todaysTimetables={todaysTimetables}
                  upcomingTimetables={upcomingTimetables}
                  isLoading={isLoading}
                  onCreatePlanClick={handleCreatePlanClick}
                  onDeleteTimetable={handleDeleteTimetable}
                />
              </div>
            )}
          </div>

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-8 right-8 md:hidden">
            <button
              onClick={handleCreatePlanClick}
              className="bg-purple-1 text-white w-14 h-14 rounded-full shadow-lg hover:bg-[#5C5A90] transition-all duration-200 flex items-center justify-center hover:scale-110"
              title="Create new study plan"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </main>
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </ProtectedRoute>
  );
}