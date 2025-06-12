import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import ColorDot from '@/components/atoms/ColorDot';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';

const PRIORITY_COLORS = {
  high: '#F44336',
  medium: '#FF9800',
  low: '#64748b',
};

const STATUS_CONFIG = {
  todo: { label: 'To Do', variant: 'statusTodo' },
  'in-progress': { label: 'In Progress', variant: 'statusInProgress' },
  done: { label: 'Done', variant: 'statusDone' },
};

const TaskCard = ({ 
  task, 
  index, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  projectName, 
  projectColor,
  draggable = false,
  onDragStart,
  onDragEnd,
  isDragged,
  hideStatusSelect = false
}) => {

  const statusBadge = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      draggable={draggable}
      onDragStart={(e) => draggable && onDragStart(e, task)}
      onDragEnd={(e) => draggable && onDragEnd(e, task)}
      className={`
        bg-white rounded-lg p-4 shadow-sm border border-surface-200 group
        hover:shadow-md transition-all duration-200
        ${draggable ? 'cursor-move' : ''}
        ${isDragged ? 'opacity-50 rotate-2' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-surface-900 text-sm break-words">{task.title}</h4>
          {task.description && (
            <p className="text-xs text-surface-600 mt-1 break-words line-clamp-3">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
          <Button
            onClick={() => onEdit(task)}
            variant="ghost"
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Edit2", size: 12 }}
            className="p-1"
          />
          <Button
            onClick={() => onDelete(task.id)}
            variant="ghost"
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Trash2", size: 12 }}
            className="p-1"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs mt-3">
        <div className="flex items-center space-x-2">
          <ColorDot color={PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.low} size="sm" title={`${task.priority} priority`} />
          {task.dueDate && (
            <span className="text-surface-500">
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          )}
          {projectName && (
            <span className="text-surface-500">
              <ColorDot color={projectColor} size="sm" className="inline-block mr-1 align-middle"/>{projectName}
            </span>
          )}
        </div>
        {task.assignedTo && (
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {task.assignedTo.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {!hideStatusSelect && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
          <Select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-xs px-2 py-1 border border-surface-300 rounded focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;