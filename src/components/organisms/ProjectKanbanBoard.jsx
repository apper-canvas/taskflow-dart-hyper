import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import TaskCard from '@/components/molecules/TaskCard';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';

const ProjectKanbanBoard = ({ 
  tasks, 
  loading, 
  error, 
  onRetry, 
  onUpdateTaskStatus, 
  onEditTask, 
  onDeleteTask 
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const dragRef = useRef(null); // To hold the actual task object being dragged

  const columns = [
    { id: 'todo', title: 'To Do', bg: 'bg-surface-50', border: 'border-surface-200' },
    { id: 'in-progress', title: 'In Progress', bg: 'bg-info/5', border: 'border-info/20' },
    { id: 'done', title: 'Done', bg: 'bg-success/5', border: 'border-success/20' }
  ];

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    dragRef.current = task;
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (dragRef.current && dragRef.current.status !== columnId) {
      onUpdateTaskStatus(dragRef.current.id, columnId);
    }
    setDraggedTask(null);
    dragRef.current = null;
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
    dragRef.current = null;
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return <LoadingSpinner skeletonType="kanban" />;
  }

  if (error) {
    return <ErrorMessage title="Error Loading Tasks" message={error} onRetry={onRetry} />;
  }

  return (
    <div className="flex space-x-6 h-full min-w-max">
      {columns.map((column, columnIndex) => {
        const columnTasks = getTasksByStatus(column.id);
        const isDragOver = dragOverColumn === column.id;
        
        return (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
            className="flex-1 min-w-80 max-w-sm flex flex-col"
          >
            <div
              className={`
                ${column.bg} ${column.border} border-2 rounded-lg p-4 h-full flex flex-col
                ${isDragOver ? 'border-primary bg-primary/5' : ''}
                transition-colors duration-200
              `}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-surface-900">{column.title}</h3>
                <span className="text-sm text-surface-500 bg-white px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto">
                <AnimatePresence>
                  {columnTasks.map((task, taskIndex) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={taskIndex}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      draggable={true}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      isDragged={draggedTask?.id === task.id}
                      hideStatusSelect={true} // Status is changed via drag/drop in Kanban
                    />
                  ))}
                </AnimatePresence>
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8">
                    <ApperIcon name="Plus" className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                    <p className="text-sm text-surface-500">
                      {column.id === 'todo' ? 'Add your first task' : `No ${column.title.toLowerCase()} tasks`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectKanbanBoard;