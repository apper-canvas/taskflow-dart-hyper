import SectionHeader from '@/components/molecules/SectionHeader';
import FormField from '@/components/molecules/FormField';

const SettingsProfileSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
      <SectionHeader icon="User" title="Profile" />
      <div className="space-y-4">
        <FormField
          label="Display Name"
          type="text"
          defaultValue="TaskFlow User"
        />
        <FormField
          label="Email"
          type="email"
          defaultValue="user@taskflow.pro"
        />
      </div>
    </div>
  );
};

export default SettingsProfileSection;