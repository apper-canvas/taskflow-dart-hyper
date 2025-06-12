import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import SettingsProfileSection from '@/components/organisms/SettingsProfileSection';
import SettingsPreferencesSection from '@/components/organisms/SettingsPreferencesSection';
import SettingsDataPrivacySection from '@/components/organisms/SettingsDataPrivacySection';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: 'TaskFlow User',
    email: 'user@taskflow.pro'
  });
  const [preferencesData, setPreferencesData] = useState({
    notifications: true,
    theme: 'light'
  });
  const [privacyData, setPrivacyData] = useState({
    dataSharing: false,
    analytics: true
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to save the settings
      console.log('Saving settings:', { profileData, preferencesData, privacyData });
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-600">Manage your TaskFlow Pro preferences</p>
      </div>

      <div className="grid gap-6">
<div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SettingsProfileSection 
            data={profileData} 
            onChange={setProfileData} 
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SettingsPreferencesSection 
            data={preferencesData} 
            onChange={setPreferencesData} 
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SettingsDataPrivacySection 
            data={privacyData} 
            onChange={setPrivacyData} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <Button 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </motion.div>
      </div>
      </div>
    </div>
  );
}