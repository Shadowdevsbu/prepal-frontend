import { create } from 'zustand';
import { axios } from '../lib/api/axios';
import { toast } from 'react-toastify';

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

  login: (credentials: { email: string; password: string }) => Promise<Boolean>;
  signUp: (user: Omit<User, 'id' | 'role'>, password: string) => Promise<Boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
  getUserProfile: () => Promise<void>;
}

const initialAccessToken =
  typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
const initialUser =
  typeof window !== 'undefined' ? localStorage.getItem('user') : null;

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
      localStorage.setItem('access_token', data.access_token);
      set({ access_token: data.access_token, isAuthenticated: true, loading: false });

      get().setUser(data.user);
      toast.success('Signup successful!');
      return true;
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Signup failed',
      });
      toast.error(err?.response?.data?.message || 'Signup failed');
      return false;
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('access_token', data.access_token);
      set({ access_token: data.access_token, isAuthenticated: true, loading: false });

      get().setUser(data.user);

      toast.success('Login successful!');
      return true;
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || 'Login failed',
      });
      toast.error(err?.response?.data?.message || 'Login failed');
      return false;
    }
  },

  logout: () => {
    set({ user: null, access_token: null, isAuthenticated: false });
    localStorage.removeItem('access_token');
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

  getUserProfile: async () => {
    try {
      const token = get().access_token;
      if (!token) return;

      const { data } = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData: User = {
        id: data.id || null,
        email: data.email || null,
        name: data.name || null,
        department: data.department || null,
        course: data.course || null,
        level: data.level || null,
        role: data.role || null,
      };

      get().setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  },
}));
