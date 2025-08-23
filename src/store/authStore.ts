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
  getUserProfile: () => Promise<User | null>;
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
    } catch (err: unknown) {
      let errorMessage = 'Signup failed';
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        errorMessage = (err.response as { data: { message?: string } }).data.message || errorMessage;
      }
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
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
    } catch (err: unknown) {
      let errorMessage = 'Login failed';
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
      ) {
        errorMessage = (err.response as { data: { message?: string } }).data.message || errorMessage;
      }
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
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

  getUserProfile: async (): Promise<User | null> => {
    try {
      const token = get().access_token;
      if (!token) return null;

      const { data } = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const u = data.user;
      const userData: User = {
        id: u.id || null,
        email: u.email || null,
        name: u.name || null,
        department: u.department || null,
        course: u.course || null,
        level: u.level || null,
        role: u.role || null,
      };

      get().setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      return null;
    }
  },

}));
