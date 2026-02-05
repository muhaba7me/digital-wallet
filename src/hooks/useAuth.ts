import { useAuthStore } from '@/store/auth';
import type { User } from '@/types';

export const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    error,
    setUser,
    setLoading,
    setError,
    login,
    logout,
    clearError,
  } = useAuthStore();

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    isAdmin,
    isUser,
    setUser,
    setLoading,
    setError,
    login,
    logout,
    clearError,
  };
};
