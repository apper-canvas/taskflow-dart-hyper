import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SettingsProfileSection from '@/components/organisms/SettingsProfileSection';
import SettingsPreferencesSection from '@/components/organisms/SettingsPreferencesSection';
import SettingsDataPrivacySection from '@/components/organisms/SettingsDataPrivacySection';

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-600">Manage your TaskFlow Pro preferences</p>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SettingsProfileSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SettingsPreferencesSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SettingsDataPrivacySection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <Button>
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
}