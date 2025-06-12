import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

export default function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-600">Manage your TaskFlow Pro preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="User" className="text-primary" size={20} />
            <h2 className="text-lg font-medium text-surface-900">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="TaskFlow User"
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="user@taskflow.pro"
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="Settings" className="text-primary" size={20} />
            <h2 className="text-lg font-medium text-surface-900">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-surface-900">Email Notifications</h3>
                <p className="text-sm text-surface-600">Receive email updates for task changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-surface-900">Real-time Updates</h3>
                <p className="text-sm text-surface-600">Show live changes from collaborators</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Task View Default
              </label>
              <select className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option value="kanban">Kanban Board</option>
                <option value="list">List View</option>
                <option value="calendar">Calendar View</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="Shield" className="text-primary" size={20} />
            <h2 className="text-lg font-medium text-surface-900">Data & Privacy</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-sm font-medium text-surface-900">Export Data</h3>
                <p className="text-sm text-surface-600">Download all your projects and tasks</p>
              </div>
              <button className="px-4 py-2 text-sm border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors">
                Export
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-sm font-medium text-surface-900">Data Retention</h3>
                <p className="text-sm text-surface-600">Completed tasks are kept for 90 days</p>
              </div>
              <span className="text-sm text-surface-500">90 days</span>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}