import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import { updateTaskView, updateNotifications, updateTheme } from '@/store/settingsSlice';

export default function SettingsPreferencesSection() {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);

const handleTaskViewChange = (view) => {
    dispatch(updateTaskView(view));
  };

  const handleNotificationsChange = (enabled) => {
    dispatch(updateNotifications(enabled));
  };

  const handleThemeChange = (theme) => {
    dispatch(updateTheme(theme));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-surface-200 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <ApperIcon name="Settings" className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-surface-900">Preferences</h2>
          <p className="text-sm text-surface-600">Customize your app experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Task View Preference */}
        <div>
          <h3 className="text-sm font-medium text-surface-900 mb-3">Default Task View</h3>
          <div className="space-y-3">
            {[
              { value: 'list', label: 'List View', icon: 'List', description: 'View tasks in a vertical list' },
              { value: 'kanban', label: 'Kanban Board', icon: 'Columns', description: 'Organize tasks in columns by status' },
              { value: 'calendar', label: 'Calendar View', icon: 'Calendar', description: 'View tasks on a calendar (coming soon)' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  settings.taskView === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-surface-200 hover:border-surface-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="taskView"
                  value={option.value}
                  checked={settings.taskView === option.value}
                  onChange={(e) => handleTaskViewChange(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  settings.taskView === option.value
                    ? 'border-primary bg-primary'
                    : 'border-surface-300'
                }`}>
                  {settings.taskView === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    settings.taskView === option.value ? 'bg-primary/10' : 'bg-surface-100'
                  }`}>
                    <ApperIcon 
                      name={option.icon} 
                      className={`w-4 h-4 ${
                        settings.taskView === option.value ? 'text-primary' : 'text-surface-600'
                      }`} 
                    />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      settings.taskView === option.value ? 'text-primary' : 'text-surface-900'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-sm text-surface-600 mt-1">
                      {option.description}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between py-3 border-b border-surface-100 last:border-b-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-surface-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" className="w-4 h-4 text-surface-600" />
            </div>
            <div>
              <div className="font-medium text-surface-900">Notifications</div>
              <div className="text-sm text-surface-600">Receive app notifications</div>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.notifications}
            onChange={handleNotificationsChange}
          />
        </div>

        {/* Theme */}
        <div>
          <h3 className="text-sm font-medium text-surface-900 mb-3">Theme</h3>
          <div className="flex gap-3">
            {[
              { value: 'light', label: 'Light', icon: 'Sun' },
              { value: 'dark', label: 'Dark', icon: 'Moon' }
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                  settings.theme === theme.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-200 hover:border-surface-300 text-surface-700'
                }`}
              >
                <ApperIcon name={theme.icon} className="w-4 h-4" />
                <span className="font-medium">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}