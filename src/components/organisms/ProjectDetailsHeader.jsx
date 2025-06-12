import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ColorDot from '@/components/atoms/ColorDot';

const ProjectDetailsHeader = ({ project, tasksCount, onAddTask, onShareProject, onDeleteProject }) => {
  return (
    <div className="flex-shrink-0 bg-white border-b border-surface-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <ColorDot color={project.color} size="lg" className="mt-1" />
          <div>
            <h1 className="text-2xl font-display font-bold text-surface-900 break-words">
              {project.name}
            </h1>
            <p className="text-surface-600 mt-1 break-words">{project.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-surface-500">
              <span>{tasksCount} task{tasksCount !== 1 ? 's' : ''}</span>
              {project.sharedWith?.length > 0 && (
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Users" size={14} />
                  <span>Shared with {project.sharedWith.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            onClick={onAddTask}
            icon={ApperIcon}
            iconProps={{ name: "Plus", size: 16 }}
            className="mr-2"
          >
            Add Task
          </Button>
          <Button
            onClick={() => onShareProject(project)}
            variant="ghost"
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Share2", size: 18 }}
          />
          <Button
            onClick={() => onDeleteProject(project.id)}
            variant="ghost"
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Trash2", size: 18 }}
            className="text-surface-600 hover:text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsHeader;