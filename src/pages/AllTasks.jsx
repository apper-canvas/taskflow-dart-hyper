import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ApperIcon from '../components/ApperIcon';
import TaskModal from '../components/TaskModal';
import { taskService, projectService } from '../services';

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    project: 'all',
    priority: 'all'
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, projectsData] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ]);
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskService.updateStatus(taskId, newStatus);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      toast.success('Task status updated');
    } catch (err) {
      toast.error('Failed to update task status');
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

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.project !== 'all' && task.projectId !== filters.project) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    return true;
  });

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  const getProjectColor = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.color || '#64748b';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'todo': { label: 'To Do', bg: 'bg-surface-100', text: 'text-surface-700' },
      'in-progress': { label: 'In Progress', bg: 'bg-info/10', text: 'text-info' },
      'done': { label: 'Done', bg: 'bg-success/10', text: 'text-success' }
    };
    return statusConfig[status] || statusConfig.todo;
  };

  if (loading) {
    return (
      <div className="p-6 max-w-full overflow-hidden">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-200 rounded w-1/4"></div>
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-surface-200 rounded w-32"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-24 bg-surface-200 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Tasks</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">All Tasks</h1>
        <p className="text-surface-600">View and manage tasks across all projects</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border border-surface-200">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-surface-700">Status:</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-1.5 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-surface-700">Project:</label>
          <select
            value={filters.project}
            onChange={(e) => setFilters(prev => ({ ...prev, project: e.target.value }))}
            className="px-3 py-1.5 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-surface-700">Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
            className="px-3 py-1.5 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="ml-auto text-sm text-surface-600">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <ApperIcon name="Search" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">No tasks found</h3>
          <p className="text-surface-600">Try adjusting your filters or create a new task</p>
        </motion.div>
      ) : (
        <div className="space-y-4 max-w-full overflow-hidden">
          <AnimatePresence>
            {filteredTasks.map((task, index) => {
              const statusBadge = getStatusBadge(task.status);
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-sm border border-surface-200 p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div 
                        className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: getProjectColor(task.projectId) }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-surface-900 break-words">{task.title}</h3>
                        <p className="text-sm text-surface-600 mt-1 break-words">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-surface-500">
                          <span>{getProjectName(task.projectId)}</span>
                          {task.dueDate && (
                            <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                          )}
                          {task.assignedTo && (
                            <span>Assigned to {task.assignedTo}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                        title={`${task.priority} priority`}
                      />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-surface-300 rounded focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-1.5 text-surface-400 hover:text-primary transition-colors rounded"
                      >
                        <ApperIcon name="Edit2" size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 text-surface-400 hover:text-error transition-colors rounded"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <TaskModal
            task={selectedTask}
            projects={projects}
            onClose={() => {
              setShowTaskModal(false);
              setSelectedTask(null);
            }}
            onSubmit={handleUpdateTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}