import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns'; // Still needed for TaskCard
import ApperIcon from '@/components/ApperIcon'; // Still needed for EmptyState
import TaskCard from '@/components/molecules/TaskCard';
import Modal from '@/components/molecules/Modal';
import TaskForm from '@/components/organisms/TaskForm';
import AllTasksFilterBar from '@/components/organisms/AllTasksFilterBar';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import EmptyState from '@/components/atoms/EmptyState';
import { taskService, projectService } from '@/services';

export default function AllTasksPage() {
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

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
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
      closeTaskModal();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
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
    return project?.color || '#64748b'; // Default gray if project not found
  };

  if (loading) {
    return <LoadingSpinner skeletonType="listPage" />;
  }

  if (error) {
    return <ErrorMessage title="Error Loading Tasks" message={error} onRetry={loadData} />;
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">All Tasks</h1>
        <p className="text-surface-600">View and manage tasks across all projects</p>
      </div>

      <AllTasksFilterBar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        projects={projects} 
        taskCount={filteredTasks.length} 
      />

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon="Search"
          title="No tasks found"
          description="Try adjusting your filters or create a new task"
          className="py-12"
        />
      ) : (
        <div className="space-y-4 max-w-full overflow-hidden">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                projectName={getProjectName(task.projectId)}
                projectColor={getProjectColor(task.projectId)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {showTaskModal && (
        <Modal
          title={selectedTask ? 'Edit Task' : 'New Task'}
          onClose={closeTaskModal}
          className="max-w-lg"
        >
          <TaskForm
            task={selectedTask}
            projects={projects}
            onSubmit={handleUpdateTask}
            onClose={closeTaskModal}
          />
        </Modal>
      )}
    </div>
  );
}