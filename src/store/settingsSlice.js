import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskView: 'list', // 'list', 'kanban', 'calendar'
  notifications: true,
  theme: 'light',
  emailNotifications: true,
  pushNotifications: false,
  dataSharing: false,
  analytics: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateTaskView: (state, action) => {
      state.taskView = action.payload;
    },
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateEmailNotifications: (state, action) => {
      state.emailNotifications = action.payload;
    },
    updatePushNotifications: (state, action) => {
      state.pushNotifications = action.payload;
    },
    updateDataSharing: (state, action) => {
      state.dataSharing = action.payload;
    },
    updateAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  updateTaskView,
  updateNotifications,
  updateTheme,
  updateEmailNotifications,
  updatePushNotifications,
  updateDataSharing,
  updateAnalytics,
  updateSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;