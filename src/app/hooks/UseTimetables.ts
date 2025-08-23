// src/app/hooks/useTimetables.ts (Fixed Version)
"use client";

import { useState, useEffect, useCallback } from 'react';
import { TimetableEntry } from '@/app/components/TimetableList';
import { TimetableFormData } from '@/app/components/TimetableForm';
import { TimetableApiService, LocalStorageService } from '@/app/services/timetableApi';

interface UseTimetablesOptions {
  useApi?: boolean;
  autoLoad?: boolean;
  loadType?: 'all' | 'today' | 'upcoming';
}

interface UseTimetablesReturn {
  // Data
  timetables: TimetableEntry[];
  todaysTimetables: TimetableEntry[];
  upcomingTimetables: TimetableEntry[];
  
  // States
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean; // NEW: Track if initial load is complete
  
  // Actions
  loadTimetables: (type?: 'all' | 'today' | 'upcoming') => Promise<boolean>;
  createTimetable: (formData: TimetableFormData) => Promise<TimetableEntry>;
  deleteTimetable: (id: string) => Promise<void>;
  updateTimetable: (id: string, formData: Partial<TimetableFormData>) => Promise<TimetableEntry>;
  getTimetableById: (id: string) => Promise<TimetableEntry>;
  
  // Utilities
  clearError: () => void;
  refreshTimetables: () => Promise<void>;
  filterTimetablesByDate: (date: string) => TimetableEntry[];
  getTimetablesForDateRange: (startDate: string, endDate: string) => TimetableEntry[];
}

export function useTimetables(options: UseTimetablesOptions = {}): UseTimetablesReturn {
  const { 
    useApi = process.env.NEXT_PUBLIC_USE_API === 'true', 
    autoLoad = true,
    loadType = 'all'
  } = options;

  // State management
  const [timetables, setTimetables] = useState<TimetableEntry[]>([]);
  const [todaysTimetables, setTodaysTimetables] = useState<TimetableEntry[]>([]);
  const [upcomingTimetables, setUpcomingTimetables] = useState<TimetableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with true for autoLoad
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // NEW: Track initialization

  // Helper function to handle errors
  const handleError = useCallback((err: unknown, fallbackMessage: string) => {
    const errorMessage = err instanceof Error ? err.message : fallbackMessage;
    setError(errorMessage);
    console.error(fallbackMessage, err);
    return errorMessage;
  }, []);

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Filter timetables by date from localStorage/state
  const filterTimetablesByDate = useCallback((date: string): TimetableEntry[] => {
    return timetables.filter(timetable => timetable.studyDate === date);
  }, [timetables]);

  // Get timetables for a date range
  const getTimetablesForDateRange = useCallback((startDate: string, endDate: string): TimetableEntry[] => {
    return timetables.filter(timetable => {
      const timetableDate = new Date(timetable.studyDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return timetableDate >= start && timetableDate <= end;
    });
  }, [timetables]);

  // Load timetables function with support for different types
  const loadTimetables = useCallback(async (type: 'all' | 'today' | 'upcoming' = 'all'): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('DEBUG HOOK - Starting to load timetables, type:', type);
      
      if (useApi) {
        // Use API service
        try {
          switch (type) {
            case 'all':
              const allTimetables = await TimetableApiService.fetchTimetables();
              console.log('DEBUG HOOK - API returned timetables:', allTimetables);
              setTimetables(allTimetables);
              
              // Also set today's and upcoming from the all data
              const today = getTodayDate();
              const todaysFromAll = allTimetables.filter(t => t.studyDate === today);
              const upcomingFromAll = allTimetables.filter(t => new Date(t.studyDate) > new Date(today));
              
              setTodaysTimetables(todaysFromAll);
              setUpcomingTimetables(upcomingFromAll);
              return allTimetables.length > 0;

            case 'today':
              const todaysData = await TimetableApiService.fetchTodaysTimetables();
              setTodaysTimetables(todaysData);
              return todaysData.length > 0;

            case 'upcoming':
              const upcomingData = await TimetableApiService.fetchUpcomingTimetables();
              setUpcomingTimetables(upcomingData);
              return upcomingData.length > 0;

            default:
              throw new Error('Invalid load type');
          }
        } catch (apiError) {
          console.warn('API failed, falling back to localStorage:', apiError);
          // Fallback to localStorage logic
          const localTimetables = LocalStorageService.getTimetables();
          console.log('DEBUG HOOK - LocalStorage fallback returned:', localTimetables);
          setTimetables(localTimetables);
          
          const today = getTodayDate();
          const todaysLocal = localTimetables.filter(t => t.studyDate === today);
          const upcomingLocal = localTimetables.filter(t => new Date(t.studyDate) > new Date(today));
          
          setTodaysTimetables(todaysLocal);
          setUpcomingTimetables(upcomingLocal);
          
          return localTimetables.length > 0;
        }
      } else {
        // Use localStorage
        console.log('DEBUG HOOK - Using localStorage directly');
        const localTimetables = LocalStorageService.getTimetables();
        console.log('DEBUG HOOK - LocalStorage returned:', localTimetables);
        setTimetables(localTimetables);
        
        const today = getTodayDate();
        const todaysLocal = localTimetables.filter(t => t.studyDate === today);
        const upcomingLocal = localTimetables.filter(t => new Date(t.studyDate) > new Date(today));
        
        setTodaysTimetables(todaysLocal);
        setUpcomingTimetables(upcomingLocal);
        
        return localTimetables.length > 0;
      }
    } catch (err) {
      handleError(err, `Failed to load ${type} timetables`);
      return false;
    } finally {
      console.log('DEBUG HOOK - Load complete, setting isLoading to false');
      setIsLoading(false);
      setIsInitialized(true); // Mark as initialized
    }
  }, [useApi, handleError, getTodayDate]);

  // Create timetable function
  const createTimetable = useCallback(async (formData: TimetableFormData): Promise<TimetableEntry> => {
    setIsLoading(true);
    setError(null);

    try {
      let newTimetable: TimetableEntry;

      if (useApi) {
        try {
          const apiResponse = await TimetableApiService.createTimetable(formData);
          newTimetable = {
            ...apiResponse,
            createdAt: apiResponse.createdAt || Date.now()
          };
        } catch (apiError) {
          console.warn('API failed, falling back to localStorage:', apiError);
          newTimetable = LocalStorageService.addTimetable(formData);
        }
      } else {
        newTimetable = LocalStorageService.addTimetable(formData);
      }

      // Update all relevant state
      setTimetables(prev => [newTimetable, ...prev]);
      
      // Update today's timetables if the new timetable is for today
      const today = getTodayDate();
      if (newTimetable.studyDate === today) {
        setTodaysTimetables(prev => [newTimetable, ...prev]);
      }
      
      // Update upcoming timetables if the new timetable is in the future
      if (new Date(newTimetable.studyDate) > new Date(today)) {
        setUpcomingTimetables(prev => [newTimetable, ...prev.filter(t => t.id !== newTimetable.id)].sort((a, b) => new Date(a.studyDate).getTime() - new Date(b.studyDate).getTime()));
      }

      return newTimetable;
    } catch (err) {
      const errorMessage = handleError(err, 'Failed to create timetable');
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [useApi, handleError, getTodayDate]);

  // Delete timetable function
  const deleteTimetable = useCallback(async (id: string): Promise<void> => {
    const originalTimetables = [...timetables];
    const originalTodaysTimetables = [...todaysTimetables];
    const originalUpcomingTimetables = [...upcomingTimetables];
    
    // Optimistic update
    setTimetables(prev => prev.filter(item => item.id !== id));
    setTodaysTimetables(prev => prev.filter(item => item.id !== id));
    setUpcomingTimetables(prev => prev.filter(item => item.id !== id));

    try {
      if (useApi) {
        try {
          await TimetableApiService.deleteTimetable(id);
        } catch (apiError) {
          console.warn('API failed, falling back to localStorage:', apiError);
          LocalStorageService.deleteTimetable(id);
        }
      } else {
        LocalStorageService.deleteTimetable(id);
      }
    } catch (err) {
      // Revert optimistic update on error
      setTimetables(originalTimetables);
      setTodaysTimetables(originalTodaysTimetables);
      setUpcomingTimetables(originalUpcomingTimetables);
      const errorMessage = handleError(err, 'Failed to delete timetable');
      throw new Error(errorMessage);
    }
  }, [timetables, todaysTimetables, upcomingTimetables, useApi, handleError]);

  // Update timetable function (partial updates supported)
  const updateTimetable = useCallback(async (id: string, formData: Partial<TimetableFormData>): Promise<TimetableEntry> => {
    const originalTimetables = [...timetables];
    const originalTodaysTimetables = [...todaysTimetables];
    const originalUpcomingTimetables = [...upcomingTimetables];
    
    try {
      let updatedTimetable: TimetableEntry;

      if (useApi) {
        updatedTimetable = await TimetableApiService.updateTimetable(id, formData);
      } else {
        // For localStorage, we need to implement the update logic
        const currentTimetables = LocalStorageService.getTimetables();
        const timetableIndex = currentTimetables.findIndex(t => t.id === id);
        
        if (timetableIndex === -1) {
          throw new Error('Timetable not found');
        }

        updatedTimetable = {
          ...currentTimetables[timetableIndex],
          ...formData,
        };

        currentTimetables[timetableIndex] = updatedTimetable;
        LocalStorageService.saveTimetables(currentTimetables);
      }

      // Update all relevant state
      setTimetables(prev => 
        prev.map(item => item.id === id ? updatedTimetable : item)
      );

      const today = getTodayDate();
      
      // Update today's timetables
      if (updatedTimetable.studyDate === today) {
        setTodaysTimetables(prev => {
          const filtered = prev.filter(item => item.id !== id);
          return [updatedTimetable, ...filtered];
        });
      } else {
        setTodaysTimetables(prev => prev.filter(item => item.id !== id));
      }

      // Update upcoming timetables
      if (new Date(updatedTimetable.studyDate) > new Date(today)) {
        setUpcomingTimetables(prev => {
          const filtered = prev.filter(item => item.id !== id);
          return [updatedTimetable, ...filtered].sort((a, b) => 
            new Date(a.studyDate).getTime() - new Date(b.studyDate).getTime()
          );
        });
      } else {
        setUpcomingTimetables(prev => prev.filter(item => item.id !== id));
      }

      return updatedTimetable;
    } catch (err) {
      // Revert optimistic update if there was one
      setTimetables(originalTimetables);
      setTodaysTimetables(originalTodaysTimetables);
      setUpcomingTimetables(originalUpcomingTimetables);
      const errorMessage = handleError(err, 'Failed to update timetable');
      throw new Error(errorMessage);
    }
  }, [timetables, todaysTimetables, upcomingTimetables, useApi, handleError, getTodayDate]);

  // Get timetable by ID
  const getTimetableById = useCallback(async (id: string): Promise<TimetableEntry> => {
    try {
      if (useApi) {
        return await TimetableApiService.getTimetableById(id);
      } else {
        const localTimetables = LocalStorageService.getTimetables();
        const timetable = localTimetables.find(t => t.id === id);
        if (!timetable) {
          throw new Error('Timetable not found');
        }
        return timetable;
      }
    } catch (err) {
      const errorMessage = handleError(err, 'Failed to fetch timetable');
      throw new Error(errorMessage);
    }
  }, [useApi, handleError]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Refresh timetables function
  const refreshTimetables = useCallback(async (): Promise<void> => {
    await loadTimetables(loadType);
  }, [loadTimetables, loadType]);

  // Auto-load effect - FIXED
  useEffect(() => {
    if (autoLoad) {
      console.log('DEBUG HOOK - Auto-loading timetables');
      loadTimetables(loadType);
    } else {
      // If not auto-loading, still mark as initialized
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, []); // Only run once on mount

  return {
    // Data
    timetables,
    todaysTimetables,
    upcomingTimetables,
    
    // States
    isLoading,
    error,
    isInitialized, // NEW: Export initialization state
    
    // Actions
    loadTimetables,
    createTimetable,
    deleteTimetable,
    updateTimetable,
    getTimetableById,
    
    // Utilities
    clearError,
    refreshTimetables,
    filterTimetablesByDate,
    getTimetablesForDateRange,
  };
}