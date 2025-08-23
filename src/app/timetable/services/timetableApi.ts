// src/app/services/timetableApi.ts

import { TimetableEntry } from '../TimetableList';
import { TimetableFormData } from '../TimetableForm';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface CreateTimetableResponse {
  id: string;
  courseName: string;
  courseTitle: string;
  studyDate: string;
  studyTime: string;
  createdAt: number;
  userId?: string;
}

// Helper function to handle API errors
const handleApiError = (error: unknown): never => {
  console.error('API Error:', error);
  
  if (typeof error === 'object' && error !== null && 'response' in error) {
    // Server responded with error status
    throw new Error((error as any).response.data?.message || 'Server error occurred');
  } else if (typeof error === 'object' && error !== null && 'request' in error) {
    // Request was made but no response received
    throw new Error('Network error - please check your connection');
  } else {
    // Something else happened
    throw new Error((error as Error).message || 'An unexpected error occurred');
  }
};

// Helper function to get auth headers (if using authentication)
const getAuthHeaders = () => {
  // Replace this with your actual auth token logic
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Timetable API Service
export class TimetableApiService {
  
  // Fetch all timetables for the current user
  static async fetchTimetables(): Promise<TimetableEntry[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TimetableEntry[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch timetables');
      }

      return result.data || [];
    } catch (error) {
      handleApiError(error);
    }
  }

  // Fetch today's timetables
  static async fetchTodaysTimetables(): Promise<TimetableEntry[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables/today`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TimetableEntry[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch today\'s timetables');
      }

      return result.data || [];
    } catch (error) {
      handleApiError(error);
    }
  }

  // Fetch upcoming timetables
  static async fetchUpcomingTimetables(): Promise<TimetableEntry[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables/upcoming`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TimetableEntry[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch upcoming timetables');
      }

      return result.data || [];
    } catch (error) {
      handleApiError(error);
    }
  }

  // Create a new timetable
  static async createTimetable(formData: TimetableFormData): Promise<CreateTimetableResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          courseName: formData.courseName,
          courseTitle: formData.courseTitle,
          studyDate: formData.studyDate,
          studyTime: formData.studyTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<CreateTimetableResponse> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create timetable');
      }

      if (!result.data) {
        throw new Error('No data returned from server');
      }

      return result.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // Update an existing timetable (using PATCH instead of PUT)
  static async updateTimetable(id: string, formData: Partial<TimetableFormData>): Promise<TimetableEntry> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...(formData.courseName && { courseName: formData.courseName }),
          ...(formData.courseTitle && { courseTitle: formData.courseTitle }),
          ...(formData.studyDate && { studyDate: formData.studyDate }),
          ...(formData.studyTime && { studyTime: formData.studyTime }),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TimetableEntry> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update timetable');
      }

      if (!result.data) {
        throw new Error('No data returned from server');
      }

      return result.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // Delete a timetable
  static async deleteTimetable(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<null> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete timetable');
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  // Get a single timetable by ID
  static async getTimetableById(id: string): Promise<TimetableEntry> {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TimetableEntry> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch timetable');
      }

      if (!result.data) {
        throw new Error('Timetable not found');
      }

      return result.data;
    } catch (error) {
      handleApiError(error);
    }
  }
}

// Fallback to localStorage if API is not available (for development/offline mode)
export class LocalStorageService {
  private static STORAGE_KEY = 'userTimetables';

  static getTimetables(): TimetableEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const timetables: TimetableEntry[] = JSON.parse(stored);
        return timetables.sort((a, b) => b.createdAt - a.createdAt);
      }
      return [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  static saveTimetables(timetables: TimetableEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(timetables));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save timetables locally');
    }
  }

  static addTimetable(formData: TimetableFormData): TimetableEntry {
    const newTimetable: TimetableEntry = {
      id: Date.now().toString(),
      ...formData,
      createdAt: Date.now(),
    };

    const currentTimetables = this.getTimetables();
    const updatedTimetables = [newTimetable, ...currentTimetables];
    this.saveTimetables(updatedTimetables);

    return newTimetable;
  }

  static deleteTimetable(id: string): void {
    const currentTimetables = this.getTimetables();
    const updatedTimetables = currentTimetables.filter(t => t.id !== id);
    this.saveTimetables(updatedTimetables);
  }
}