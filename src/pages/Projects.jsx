import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';
import ProjectModal from '../components/ProjectModal';
import ShareModal from '../components/ShareModal';
import { projectService } from '../services';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [projectToShare, setProjectToShare] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await projectService.getAll();
      setProjects(result);
      if (result.length > 0 && !selectedProject) {
        setSelectedProject(result[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load projects');
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.create(projectData);
      setProjects(prev => [...prev, newProject]);
      setSelectedProject(newProject);
      setShowCreateModal(false);
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

  if (loading) {
    return (
      <div className="h-full flex">
        <div className="w-80 bg-white border-r border-surface-200 p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="animate-pulse"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg">
                <div className="w-4 h-4 bg-surface-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-surface-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-surface-200 rounded w-1/2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex-1 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/3"></div>
            <div className="grid grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-surface-200 rounded-lg"></div>
              ))}
            </div>
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
          <h3 className="text-lg font-medium text-surface-900 mb-2">Error Loading Projects</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadProjects}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="FolderOpen" className="w-16 h-16 text-surface-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-surface-900">No projects yet</h3>
          <p className="mt-2 text-surface-600">Create your first project to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Project
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex max-w-full overflow-hidden">
      {/* Project Sidebar */}
      <div className="w-80 bg-white border-r border-surface-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-surface-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-surface-900">Projects</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ApperIcon name="Plus" size={16} />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative group rounded-lg p-3 cursor-pointer transition-all duration-150
                  ${selectedProject?.id === project.id 
                    ? 'bg-primary/10 border-l-4 border-primary' 
                    : 'hover:bg-surface-50'
                  }
                `}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full mt-0.5"
                    style={{ backgroundColor: project.color }}
                  />
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareProject(project);
                      }}
                      className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
                    >
                      <ApperIcon name="Share2" size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {selectedProject ? (
          <MainFeature 
            project={selectedProject} 
            onDeleteProject={handleDeleteProject}
            onShareProject={handleShareProject}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="MousePointer" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-600">Select a project to view tasks</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && (
          <ProjectModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateProject}
          />
        )}
        {showShareModal && projectToShare && (
          <ShareModal
            project={projectToShare}
            onClose={() => {
              setShowShareModal(false);
              setProjectToShare(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}