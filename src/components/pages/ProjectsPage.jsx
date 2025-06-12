import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProjectSidebar from '@/components/organisms/ProjectSidebar';
import ProjectDetailsHeader from '@/components/organisms/ProjectDetailsHeader';
import ProjectKanbanBoard from '@/components/organisms/ProjectKanbanBoard';
import ProjectForm from '@/components/organisms/ProjectForm';
import ShareModalOrganism from '@/components/organisms/ShareModalOrganism';
import Modal from '@/components/molecules/Modal';
import TaskForm from '@/components/organisms/TaskForm';
import { projectService, taskService } from '@/services';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorProjects, setErrorProjects] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [errorTasks, setErrorTasks] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [projectToShare, setProjectToShare] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks(selectedProject.id);
    } else {
      setTasks([]);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const result = await projectService.getAll();
      setProjects(result);
      if (result.length > 0 && !selectedProject) {
        setSelectedProject(result[0]);
      } else if (result.length === 0) {
        setSelectedProject(null);
      }
    } catch (err) {
      setErrorProjects(err.message || 'Failed to load projects');
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const loadTasks = async (projectId) => {
    setLoadingTasks(true);
    setErrorTasks(null);
    try {
      const result = await taskService.getByProjectId(projectId);
      setTasks(result);
    } catch (err) {
      setErrorTasks(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.create(projectData);
      setProjects(prev => [...prev, newProject]);
      setSelectedProject(newProject);
      setShowProjectModal(false);
      toast.success('Project created successfully');
    } catch (err) {
      toast.error('Failed to create project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectService.delete(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        const remaining = projects.filter(p => p.id !== projectId);
        setSelectedProject(remaining.length > 0 ? remaining[0] : null);
      }
      toast.success('Project deleted successfully');
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleShareProject = (project) => {
    setProjectToShare(project);
    setShowShareModal(true);
  };

  const closeProjectModal = () => setShowProjectModal(false);
  const closeShareModal = () => {
    setShowShareModal(false);
    setProjectToShare(null);
  };

  // Task Handlers
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        projectId: selectedProject.id,
        status: 'todo'
      });
      setTasks(prev => [...prev, newTask]);
      closeTaskModal();
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
      closeTaskModal();
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

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
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

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };


  return (
    <div className="h-full flex max-w-full overflow-hidden">
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProject?.id}
        onSelectProject={setSelectedProject}
        onCreateProject={() => setShowProjectModal(true)}
        loading={loadingProjects}
        error={errorProjects}
        onRetry={loadProjects}
      />

      <div className="flex-1 overflow-hidden">
        {selectedProject ? (
          <>
            <ProjectDetailsHeader
              project={selectedProject}
              tasksCount={tasks.length}
              onAddTask={() => {
                setSelectedTask(null); // Ensure no task is pre-filled for new task
                setShowTaskModal(true);
              }}
              onShareProject={handleShareProject}
              onDeleteProject={handleDeleteProject}
            />
            <ProjectKanbanBoard
              tasks={tasks}
              loading={loadingTasks}
              error={errorTasks}
              onRetry={() => loadTasks(selectedProject.id)}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="MousePointer" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-600 mb-6">Select a project to view tasks</p>
              <Button 
                variant="primary" 
                onClick={() => setShowProjectModal(true)}
                className="inline-flex items-center gap-2"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                Create New Project
              </Button>
            </div>
          </div>
        )}
      </div>

      {showProjectModal && (
        <Modal
          title={selectedProject && !projectToShare ? 'Edit Project' : 'New Project'}
          onClose={closeProjectModal}
          className="max-w-md"
        >
          <ProjectForm 
            project={null} // Always creating a new project via this modal if triggered from sidebar
            onSubmit={handleCreateProject} 
            onClose={closeProjectModal} 
          />
        </Modal>
      )}

      {showTaskModal && selectedProject && (
        <Modal
          title={selectedTask ? 'Edit Task' : 'New Task'}
          onClose={closeTaskModal}
          className="max-w-lg"
        >
          <TaskForm
            task={selectedTask}
            projects={[selectedProject]} // Pass only the current project for task creation/editing
            defaultProjectId={selectedProject.id}
            onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
            onClose={closeTaskModal}
          />
        </Modal>
      )}

      {showShareModal && projectToShare && (
        <ShareModalOrganism
          project={projectToShare}
          onClose={closeShareModal}
        />
      )}
    </div>
  );
}