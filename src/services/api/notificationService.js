import notificationsData from '@/services/mockData/notifications.json';

class NotificationService {
  constructor() {
    this.notifications = [...notificationsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Sort by creation date, newest first
    return [...this.notifications].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    return { ...notification };
  }

  async getUnreadCount() {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return this.notifications.filter(n => !n.read).length;
  }

  async markAsRead(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    notification.read = true;
    notification.readAt = new Date().toISOString();
    
    return { ...notification };
  }

  async markAllAsRead() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const now = new Date().toISOString();
    this.notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true;
        notification.readAt = now;
      }
    });
    
    return this.notifications.filter(n => n.read);
  }

  async create(notificationData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const newNotification = {
      id: Date.now(),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString(),
      readAt: null
    };
    
    this.notifications.push(newNotification);
    return { ...newNotification };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.notifications.findIndex(n => n.id === id);
    if (index === -1) {
      throw new Error('Notification not found');
    }
    
    const deletedNotification = this.notifications.splice(index, 1)[0];
    return { ...deletedNotification };
  }

  async clearAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const cleared = [...this.notifications];
    this.notifications.length = 0;
    return cleared;
  }

  async getByType(type) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.notifications
      .filter(n => n.type === type)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export const notificationService = new NotificationService();