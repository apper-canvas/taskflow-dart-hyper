import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotificationItem = ({ notification, onMarkAsRead, onNavigate }) => {
  const navigate = useNavigate();
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'mention':
        return 'AtSign';
      case 'due_date':
        return 'Calendar';
      case 'assignment':
        return 'UserPlus';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'mention':
        return 'text-blue-600';
      case 'due_date':
        return 'text-orange-600';
      case 'assignment':
        return 'text-green-600';
      default:
        return 'text-surface-600';
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    // Navigate based on notification type
    if (notification.taskId) {
      navigate('/tasks');
    } else if (notification.projectId) {
      navigate('/projects');
    }
    
    // Close the dropdown
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 hover:bg-surface-50 cursor-pointer border-l-4 transition-colors ${
        notification.read 
          ? 'border-l-transparent bg-white' 
          : 'border-l-primary bg-primary-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
          <ApperIcon 
            name={getNotificationIcon(notification.type)} 
            size={18} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${
            notification.read ? 'text-surface-700' : 'text-surface-900 font-medium'
          }`}>
            {notification.message}
          </p>
          
          {notification.details && (
            <p className="text-xs text-surface-500 mt-1">
              {notification.details}
            </p>
          )}
          
          <p className="text-xs text-surface-400 mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>

        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;