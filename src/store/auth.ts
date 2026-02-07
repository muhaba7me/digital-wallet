import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '@/types';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }

          if (data.success && data.user) {
            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false
          });
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/get-session', {
            method: 'POST',
          });
        } catch (error) {
          console.error('Logout API call failed:', error);
        }

        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => set({ error: null }),

      checkSession: async () => {
        try {
          const response = await fetch('/api/auth/get-session');
          const data = await response.json();

          if (data.user) {
            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        } catch (error) {
          console.error('Session check failed:', error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
