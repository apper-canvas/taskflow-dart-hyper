import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import NotificationItem from '@/components/atoms/NotificationItem';
import NotificationBadge from '@/components/atoms/NotificationBadge';
import Button from '@/components/atoms/Button';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyState from '@/components/atoms/EmptyState';
import { notificationService } from '@/services';

const NotificationDropdown = ({ isOpen, onToggle, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const updatedNotification = await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? updatedNotification : notif
        )
      );
      toast.success('Notification marked as read');
    } catch (err) {
      toast.error('Failed to mark notification as read');
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      if (unreadNotifications.length === 0) return;

      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to mark all notifications as read');
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await notificationService.clearAll();
      setNotifications([]);
      toast.success('All notifications cleared');
    } catch (err) {
      toast.error('Failed to clear notifications');
      console.error('Error clearing notifications:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors"
      >
        <ApperIcon name="Bell" size={20} className="text-surface-600" />
        <NotificationBadge count={unreadCount} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-surface-200 z-50"
          >
            <div className="p-4 border-b border-surface-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-surface-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <NotificationBadge count={unreadCount} />
                )}
              </div>
              {notifications.length > 0 && (
                <div className="flex items-center space-x-2 mt-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>

<div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="sm" />
                </div>
              ) : error ? (
                <div className="p-4">
                  <div className="text-red-600 text-sm">{error}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fetchNotifications}
                    className="mt-2"
                  >
                    Try again
                  </Button>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4">
                  <EmptyState
                    icon="Bell"
                    title="No notifications"
                    description="You're all caught up!"
                  />
                </div>
              ) : (
                <div className="py-2">
{notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onNavigate={onClose}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;