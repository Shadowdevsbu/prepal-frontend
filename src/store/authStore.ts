import { create } from 'zustand';
import { axios } from '../lib/api/axios';

interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  department: string | null;
  course: string | null;
  level: string | null;
  role: string | null;
}

interface AuthState {
  access_token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  verifyingEmail: string | null;
  resetEmail: string | null;

  login: (email: string, password: string) => Promise<void>;
  signUp: (user: User, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const initialAccessToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
const initialUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

export const useAuthStore = create<AuthState>((set, get) => ({
  access_token: initialAccessToken,
  user: initialUser ? JSON.parse(initialUser) : null,
  isAuthenticated: !!initialAccessToken,
  loading: false,
  error: null,
  verifyingEmail: null,
  resetEmail: null,

  signUp: async (user, password) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post('/auth/register', { ...user, password });
      const userData: User = {
        id: data.id || null,
        email: data.email || null,
        name: data.name || null,
        department: data.department || null,
        course: data.course || null,
        level: data.level || null,
        role: data.role || null,
      };
      set({ access_token: data.token, isAuthenticated: true, loading: false });
      localStorage.setItem('authToken', data.token);
      get().setUser(userData);
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Signup failed',
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post('/auth/login', { email, password });

      const userData: User = {
        id: data.id || null,
        email: data.email || null,
        name: data.name || null,
        department: data.department || null,
        course: data.course || null,
        level: data.level || null,
        role: data.role || null,
      };

      set({ access_token: data.token, isAuthenticated: true, loading: false });
      localStorage.setItem('authToken', data.token);
      get().setUser(userData);
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Login failed',
      });
    }
  },

  logout: () => {
    set({ user: null, access_token: null, isAuthenticated: false });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
}));
