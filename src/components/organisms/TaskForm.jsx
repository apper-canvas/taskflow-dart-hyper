import { useState } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: '#64748b' },
  { value: 'medium', label: 'Medium', color: '#FF9800' },
  { value: 'high', label: 'High', color: '#F44336' }
];

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const TaskForm = ({ 
  task = null, 
  projects = [], 
  defaultProjectId = null,
  onSubmit, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    assignedTo: task?.assignedTo || '',
    projectId: task?.projectId || defaultProjectId || (projects[0]?.id || '')
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const submitData = { ...formData };
      if (!submitData.dueDate) delete submitData.dueDate;
      if (!submitData.assignedTo) delete submitData.assignedTo;
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentPriorityColor = PRIORITY_OPTIONS.find(p => p.value === formData.priority)?.color;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Task Title"
        type="text"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter task title"
        required
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Describe the task"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Status"
          type="select"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={STATUS_OPTIONS}
        />

        <div>
          <FormField
            label="Priority"
            type="select"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={PRIORITY_OPTIONS}
            className="relative"
            // Custom styling for the select to show color dot
            // This is a bit tricky with atomic design, might need a custom Select component if reusable
            // For now, embedding direct styles.
            selectClassName="appearance-none" // Hide default arrow
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentPriorityColor }}
            />
          </div>
        </div>
      </div>

      {projects.length > 1 && (
        <FormField
          label="Project"
          type="select"
          value={formData.projectId}
          onChange={(e) => handleChange('projectId', e.target.value)}
          options={projects.map(p => ({ value: p.id, label: p.name }))}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
        />

        <FormField
          label="Assign To"
          type="email"
          value={formData.assignedTo}
          onChange={(e) => handleChange('assignedTo', e.target.value)}
          placeholder="Email address"
        />
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
          disabled={loading || !formData.title.trim()}
        >
          {loading ? 'Saving...' : (task ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;