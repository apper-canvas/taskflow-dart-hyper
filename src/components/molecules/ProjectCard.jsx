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
        relative group rounded-lg p-3 cursor-pointer transition-all duration-150
        ${isSelected 
          ? 'bg-primary/10 border-l-4 border-primary' 
          : 'hover:bg-surface-50'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <ColorDot color={project.color} size="md" className="mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-surface-900 truncate">
            {project.name}
          </h3>
          <p className="text-sm text-surface-600 truncate">
            {project.description}
          </p>
          {project.sharedWith?.length > 0 && (
            <div className="flex items-center mt-1 text-xs text-surface-500">
              <ApperIcon name="Users" size={12} className="mr-1" />
              Shared with {project.sharedWith.length}
            </div>
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onShare(project);
            }}
            variant="ghost"
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Share2", size: 14 }}
            className="p-1"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;