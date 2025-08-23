// src/app/components/TimetableForm.tsx
"use client";

import React, { useState } from 'react';

export interface TimetableFormData {
  courseName: string;
  courseTitle: string;
  studyDate: string;
  studyTime: string;
}

interface TimetableFormProps {
  onSubmit: (formData: TimetableFormData) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TimetableForm({ 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: TimetableFormProps) {
  const [formData, setFormData] = useState<TimetableFormData>({
    courseName: '',
    courseTitle: '',
    studyDate: '',
    studyTime: ''
  });

  const [errors, setErrors] = useState<Partial<TimetableFormData>>({});

  const handleInputChange = (field: keyof TimetableFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TimetableFormData> = {};

    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }

    if (!formData.courseTitle.trim()) {
      newErrors.courseTitle = 'Course title is required';
    }

    if (!formData.studyDate) {
      newErrors.studyDate = 'Study date is required';
    }

    if (!formData.studyTime) {
      newErrors.studyTime = 'Study time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on successful submission
      setFormData({
        courseName: '',
        courseTitle: '',
        studyDate: '',
        studyTime: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (you might want to show a toast notification)
    }
  };

  const handleCancel = () => {
    // Reset form and call onCancel
    setFormData({
      courseName: '',
      courseTitle: '',
      studyDate: '',
      studyTime: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="opacity-100 bg-white rounded-xl p-8 max-w-2xl mx-auto my-auto min-h-[500px] flex flex-col"
    >
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Create Plan</h2>

      {/* Course Name */}
      <div className="mb-4">
        <label htmlFor="courseName" className="block text-lg font-semibold text-gray-900 mb-2">
          Course Name
        </label>
        <input 
          type="text"
          id="courseName"
          className={`w-full p-3 border-1 rounded-3xl outline-none text-black ${
            errors.courseName ? 'border-red-500' : 'border-purple-1'
          }`}
          value={formData.courseName}
          onChange={(e) => handleInputChange('courseName', e.target.value)}
          disabled={isLoading}
          required
        />
        {errors.courseName && (
          <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
        )}
      </div>

      {/* Course Title */}
      <div className="mb-6">
        <label htmlFor="courseTitle" className="block text-lg font-semibold text-gray-900 mb-2">
          Course Title
        </label>
        <input
          type="text"
          id="courseTitle"
          className={`w-full p-3 border-1 rounded-3xl outline-none text-black ${
            errors.courseTitle ? 'border-red-500' : 'border-purple-1'
          }`}
          value={formData.courseTitle}
          onChange={(e) => handleInputChange('courseTitle', e.target.value)}
          disabled={isLoading}
          required
        />
        {errors.courseTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>
        )}
      </div>

      {/* Study Date and Study Time */}
      <div className='flex gap-4 mb-6'>
        <div className="flex-1">
          <label htmlFor="studyDate" className="block text-lg font-semibold text-gray-900 mb-2">
            Study Date
          </label>
          <input
            type="date"
            id="studyDate"
            className={`w-full p-3 border-1 rounded-full outline-none text-black ${
              errors.studyDate ? 'border-red-500' : 'border-purple-1'
            }`}
            value={formData.studyDate}
            onChange={(e) => handleInputChange('studyDate', e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.studyDate && (
            <p className="text-red-500 text-sm mt-1">{errors.studyDate}</p>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="studyTime" className="block text-lg font-semibold text-gray-900 mb-2">
            Study Time
          </label>
          <input
            type="time"
            id="studyTime"
            className={`w-full p-3 border-1 rounded-full outline-none text-black ${
              errors.studyTime ? 'border-red-500' : 'border-purple-1'
            }`}
            value={formData.studyTime}
            onChange={(e) => handleInputChange('studyTime', e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.studyTime && (
            <p className="text-red-500 text-sm mt-1">{errors.studyTime}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-auto pt-8">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-3 rounded-lg font-medium text-lg w-64 transition-colors duration-200 ${
            isLoading 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-purple-1 text-white hover:bg-[#5C5A90]'
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Plan'}
        </button>
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200 text-lg w-64 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}