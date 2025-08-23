// src/app/components/TimetableItemCard.tsx
"use client";

import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Trash2, Edit, MoreVertical } from 'lucide-react';

interface TimetableItemCardProps {
  id: string;
  courseName: string;
  courseTitle: string;
  studyDate: string;
  studyTime: string;
  onDelete: (id: string) => Promise<void> | void;
  onEdit?: (id: string) => void;
  className?: string;
}

export default function TimetableItemCard({
  id,
  courseName,
  courseTitle,
  studyDate,
  studyTime,
  onDelete,
  onEdit,
  className = ''
}: TimetableItemCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time to compare dates only
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if the study session is today
  const isToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return studyDate === today;
  };

  // Check if the study session has passed
  const isPast = () => {
    const now = new Date();
    const sessionDateTime = new Date(`${studyDate}T${studyTime}`);
    return sessionDateTime < now;
  };

  // Handle delete with confirmation
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this study plan?')) {
      setIsDeleting(true);
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting timetable:', error);
      } finally {
        setIsDeleting(false);
        setShowMenu(false);
      }
    }
  };

  // Handle edit
  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
    setShowMenu(false);
  };

  // Get card status styling
  const getStatusStyling = () => {
    if (isPast()) {
      return 'border-gray-200 bg-gray-50';
    } else if (isToday()) {
      return 'border-green-200 bg-green-50';
    } else {
      return 'border-purple-200 bg-white hover:bg-purple-50';
    }
  };

  // Get status indicator
  const getStatusIndicator = () => {
    if (isPast()) {
      return <div className="w-3 h-3 rounded-full bg-gray-400"></div>;
    } else if (isToday()) {
      return <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>;
    } else {
      return <div className="w-3 h-3 rounded-full bg-purple-500"></div>;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`rounded-xl p-6 border-2 transition-all duration-200 ${getStatusStyling()} ${
        isDeleting ? 'opacity-50 pointer-events-none' : 'hover:shadow-md'
      }`}>
        
        {/* Status Indicator and Menu */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            {getStatusIndicator()}
            <span className={`text-xs font-medium ${
              isPast() ? 'text-gray-500' : isToday() ? 'text-green-700' : 'text-purple-700'
            }`}>
              {isPast() ? 'Completed' : isToday() ? 'Today' : 'Upcoming'}
            </span>
          </div>

          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-colors duration-200 text-gray-400 hover:text-gray-600"
              title="Open menu"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                
                {/* Menu */}
                <div className="absolute right-0 top-8 z-20 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Course Information */}
        <div className="mb-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${
              isPast() ? 'bg-gray-200' : isToday() ? 'bg-green-200' : 'bg-purple-200'
            }`}>
              <BookOpen className={`w-4 h-4 ${
                isPast() ? 'text-gray-600' : isToday() ? 'text-green-700' : 'text-purple-700'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-lg leading-tight ${
                isPast() ? 'text-gray-600' : 'text-gray-900'
              }`}>
                {courseName}
              </h3>
              <p className={`text-sm mt-1 ${
                isPast() ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {courseTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className={`w-4 h-4 ${
                isPast() ? 'text-gray-400' : isToday() ? 'text-green-600' : 'text-purple-600'
              }`} />
              <span className={`text-sm font-medium ${
                isPast() ? 'text-gray-500' : isToday() ? 'text-green-700' : 'text-gray-700'
              }`}>
                {formatDate(studyDate)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${
                isPast() ? 'text-gray-400' : isToday() ? 'text-green-600' : 'text-purple-600'
              }`} />
              <span className={`text-sm font-medium ${
                isPast() ? 'text-gray-500' : isToday() ? 'text-green-700' : 'text-gray-700'
              }`}>
                {formatTime(studyTime)}
              </span>
            </div>
          </div>

          {/* Loading indicator when deleting */}
          {isDeleting && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
              <span className="text-sm text-red-600">Deleting...</span>
            </div>
          )}
        </div>

        {/* Today's session highlight */}
        {isToday() && !isPast() && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              📚 Ready to study? This session is scheduled for today!
            </p>
          </div>
        )}

        {/* Past session indicator */}
        {isPast() && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              ✅ Session completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}