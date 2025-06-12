import SectionHeader from '@/components/molecules/SectionHeader';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import FormField from '@/components/molecules/FormField';

const SettingsPreferencesSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
      <SectionHeader icon="Settings" title="Preferences" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-surface-900">Email Notifications</h3>
            <p className="text-sm text-surface-600">Receive email updates for task changes</p>
          </div>
          <ToggleSwitch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-surface-900">Real-time Updates</h3>
            <p className="text-sm text-surface-600">Show live changes from collaborators</p>
          </div>
          <ToggleSwitch defaultChecked />
        </div>

        <FormField
          label="Task View Default"
          type="select"
          options={[
            { value: 'kanban', label: 'Kanban Board' },
            { value: 'list', label: 'List View' },
            { value: 'calendar', label: 'Calendar View' },
          ]}
        />
      </div>
    </div>
  );
};

export default SettingsPreferencesSection;