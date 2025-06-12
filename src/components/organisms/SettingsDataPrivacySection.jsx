import SectionHeader from '@/components/molecules/SectionHeader';
import Button from '@/components/atoms/Button';

const SettingsDataPrivacySection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
      <SectionHeader icon="Shield" title="Data & Privacy" />
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="text-sm font-medium text-surface-900">Export Data</h3>
            <p className="text-sm text-surface-600">Download all your projects and tasks</p>
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="text-sm font-medium text-surface-900">Data Retention</h3>
            <p className="text-sm text-surface-600">Completed tasks are kept for 90 days</p>
          </div>
          <span className="text-sm text-surface-500">90 days</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsDataPrivacySection;