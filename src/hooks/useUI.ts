import { useUIStore } from '@/store/ui';

export const useUI = () => {
  const {
    sidebarOpen,
    theme,
    notifications,
    setSidebarOpen,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
    toggleSidebar,
  } = useUIStore();

  const showSuccess = (message: string) => {
    addNotification({ type: 'success', message });
  };

  const showError = (message: string) => {
    addNotification({ type: 'error', message });
  };

  const showWarning = (message: string) => {
    addNotification({ type: 'warning', message });
  };

  const showInfo = (message: string) => {
    addNotification({ type: 'info', message });
  };

  const unreadCount = notifications.length; // Simplified for now

  return {
    sidebarOpen,
    theme,
    notifications,
    unreadCount,
    setSidebarOpen,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
    toggleSidebar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
