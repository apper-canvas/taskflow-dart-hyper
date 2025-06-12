import { useState } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const PROJECT_COLORS = [
  '#5B47E0', '#FF6B6B', '#4CAF50', '#FF9800', '#2196F3',
  '#9C27B0', '#F44336', '#00BCD4', '#8BC34A', '#FF5722'
];

const ProjectForm = ({ project = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    color: project?.color || PROJECT_COLORS[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Project Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter project name"
        required
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Describe your project"
      />

      <div>
        <label className="block text-sm font-medium text-surface-700 mb-3">
          Project Color
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange('color', color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                formData.color === color 
                  ? 'border-surface-400 scale-110' 
                  : 'border-surface-200 hover:border-surface-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <Button
          type="button"
          onClick={onClose}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !formData.name.trim()}
        >
          {loading ? 'Saving...' : (project ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;