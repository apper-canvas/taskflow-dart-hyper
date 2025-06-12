import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ColorDot from '@/components/atoms/ColorDot';
import Button from '@/components/atoms/Button';

const ProjectCard = ({ 
  project, 
  isSelected, 
  onClick, 
  onShare, 
  index 
}) => {
  return (
<motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative group rounded-lg p-4 cursor-pointer transition-all duration-150 border border-transparent
        ${isSelected 
          ? 'bg-primary/10 border-primary shadow-sm' 
          : 'hover:bg-surface-50 hover:border-surface-200 hover:shadow-sm'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <ColorDot color={project.color} size="md" className="mt-1" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-surface-900 mb-1 leading-snug">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-sm text-surface-600 mb-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              {onShare && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(project);
                  }}
                  variant="ghost"
                  size="icon"
                  icon={ApperIcon}
                  iconProps={{ name: "Share2", size: 14 }}
                  className="p-1.5"
                />
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-surface-500">
              {project.taskCount !== undefined && (
                <div className="flex items-center">
                  <ApperIcon name="CheckSquare" size={12} className="mr-1" />
                  {project.taskCount} tasks
                </div>
              )}
              {project.sharedWith?.length > 0 && (
                <div className="flex items-center">
                  <ApperIcon name="Users" size={12} className="mr-1" />
                  {project.sharedWith.length} shared
                </div>
              )}
            </div>
            
            {project.taskCount > 0 && project.completedTasks !== undefined && (
              <div className="flex items-center space-x-1">
                <div className="w-16 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ 
                      width: `${Math.round((project.completedTasks / project.taskCount) * 100)}%` 
                    }}
                  />
                </div>
                <span className="text-xs text-surface-500 ml-1">
                  {Math.round((project.completedTasks / project.taskCount) * 100)}%
                </span>
</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;