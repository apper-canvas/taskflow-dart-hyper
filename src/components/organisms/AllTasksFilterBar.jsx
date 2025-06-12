import FormField from '@/components/molecules/FormField';

const AllTasksFilterBar = ({ filters, onFilterChange, projects, taskCount }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border border-surface-200">
      <FormField
        label="Status:"
        type="select"
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        options={[
          { value: 'all', label: 'All' },
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
        ]}
        className="flex items-center space-x-2 [&>label]:mb-0 [&>select]:py-1.5 [&>select]:text-sm"
      />

      <FormField
        label="Project:"
        type="select"
        value={filters.project}
        onChange={(e) => onFilterChange('project', e.target.value)}
        options={[
          { value: 'all', label: 'All Projects' },
          ...projects.map(project => ({ value: project.id, label: project.name })),
        ]}
        className="flex items-center space-x-2 [&>label]:mb-0 [&>select]:py-1.5 [&>select]:text-sm"
      />

      <FormField
        label="Priority:"
        type="select"
        value={filters.priority}
        onChange={(e) => onFilterChange('priority', e.target.value)}
        options={[
          { value: 'all', label: 'All' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]}
        className="flex items-center space-x-2 [&>label]:mb-0 [&>select]:py-1.5 [&>select]:text-sm"
      />

      <div className="ml-auto text-sm text-surface-600 self-center">
        {taskCount} task{taskCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default AllTasksFilterBar;