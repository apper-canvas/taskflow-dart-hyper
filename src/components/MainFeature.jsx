import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ApperIcon from './ApperIcon';
import TaskModal from './TaskModal';
import { taskService, projectService } from '../services';

export default function MainFeature({ project, onDeleteProject, onShareProject }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const dragRef = useRef(null);

  const columns = [
    { id: 'todo', title: 'To Do', bg: 'bg-surface-50', border: 'border-surface-200' },
    { id: 'in-progress', title: 'In Progress', bg: 'bg-info/5', border: 'border-info/20' },
    { id: 'done', title: 'Done', bg: 'bg-success/5', border: 'border-success/20' }
  ];

  useEffect(() => {
    if (project) {
      loadTasks();
    }
  }, [project]);

  const loadTasks = async () => {
    if (!project) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getByProjectId(project.id);
      setTasks(result);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        projectId: project.id,
        status: 'todo'
      });
      setTasks(prev => [...prev, newTask]);
      setShowTaskModal(false);
      toast.success('Task created successfully');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      if (selectedTask) {
        const updatedTask = await taskService.update(selectedTask.id, taskData);
        setTasks(prev => prev.map(task => 
          task.id === selectedTask.id ? updatedTask : task
        ));
        toast.success('Task updated successfully');
      }
      setShowTaskModal(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // Drag and Drop Handlers
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
    
    if (draggedTask && draggedTask.status !== columnId) {
      try {
        const updatedTask = await taskService.updateStatus(draggedTask.id, columnId);
        setTasks(prev => prev.map(task => 
          task.id === draggedTask.id ? updatedTask : task
        ));
        toast.success('Task moved successfully');
      } catch (err) {
        toast.error('Failed to move task');
      }
    }
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#64748b';
      default: return '#64748b';
    }
  };

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="MousePointer" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <p className="text-surface-600">Select a project to view tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Project Header */}
      <div className="flex-shrink-0 bg-white border-b border-surface-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div 
              className="w-6 h-6 rounded-lg mt-1"
              style={{ backgroundColor: project.color }}
            />
            <div>
              <h1 className="text-2xl font-display font-bold text-surface-900 break-words">
                {project.name}
              </h1>
              <p className="text-surface-600 mt-1 break-words">{project.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-surface-500">
                <span>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTaskModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Task
            </motion.button>
            <button
              onClick={() => onShareProject(project)}
              className="p-2 text-surface-600 hover:text-primary transition-colors rounded-lg hover:bg-surface-50"
            >
              <ApperIcon name="Share2" size={18} />
            </button>
            <button 
              onClick={() => onDeleteProject(project.id)}
              className="p-2 text-surface-600 hover:text-error transition-colors rounded-lg hover:bg-surface-50"
            >
              <ApperIcon name="Trash2" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        {loading ? (
          <div className="flex space-x-6 h-full">
            {columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 min-w-80 max-w-sm"
              >
                <div className="bg-white rounded-lg border border-surface-200 h-full p-4">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-surface-200 rounded w-1/2"></div>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-surface-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Tasks</h3>
              <p className="text-surface-600 mb-4">{error}</p>
              <button
                onClick={loadTasks}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
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
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: taskIndex * 0.05 }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task)}
                            onDragEnd={handleDragEnd}
                            className={`
                              bg-white rounded-lg p-4 shadow-sm border border-surface-200 cursor-move group
                              hover:shadow-md transition-all duration-200
                              ${draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''}
                            `}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-surface-900 text-sm break-words">
                                  {task.title}
                                </h4>
                                {task.description && (
                                  <p className="text-xs text-surface-600 mt-1 break-words line-clamp-3">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                                <button
                                  onClick={() => handleEditTask(task)}
                                  className="p-1 text-surface-400 hover:text-primary transition-colors rounded"
                                >
                                  <ApperIcon name="Edit2" size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-1 text-surface-400 hover:text-error transition-colors rounded"
                                >
                                  <ApperIcon name="Trash2" size={12} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                                  title={`${task.priority} priority`}
                                />
                                {task.dueDate && (
                                  <span className="text-surface-500">
                                    {format(new Date(task.dueDate), 'MMM d')}
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
                          </motion.div>
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
        )}
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <TaskModal
            task={selectedTask}
            projects={[project]}
            defaultProjectId={project.id}
            onClose={() => {
              setShowTaskModal(false);
              setSelectedTask(null);
            }}
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}