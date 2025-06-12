import { useState } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const ShareForm = ({ onCreateShare, loading }) => {
  const [newShare, setNewShare] = useState({
    permission: 'view',
    expiresAt: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreateShare(newShare);
    setNewShare({ permission: 'view', expiresAt: '' }); // Reset form after creation
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-surface-50 rounded-lg">
      <h3 className="font-medium text-surface-900 mb-4">Create New Share Link</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Permission"
          type="select"
          value={newShare.permission}
          onChange={(e) => setNewShare(prev => ({ ...prev, permission: e.target.value }))}
          options={[
            { value: 'view', label: 'View Only' },
            { value: 'edit', label: 'Can Edit' },
          ]}
        />
        <FormField
          label="Expires On (Optional)"
          type="datetime-local"
          value={newShare.expiresAt}
          onChange={(e) => setNewShare(prev => ({ ...prev, expiresAt: e.target.value }))}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Link'}
        </Button>
      </div>
    </form>
  );
};

export default ShareForm;