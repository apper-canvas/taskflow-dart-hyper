import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProjectCard from '@/components/molecules/ProjectCard';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import EmptyState from '@/components/atoms/EmptyState';

const ProjectSidebar = ({ 
  projects, 
  selectedProjectId, 
  onSelectProject, 
  onCreateProject, 
  loading, 
  error, 
  onRetry 
}) => {
  if (loading) {
    return <LoadingSpinner skeletonType="fullPage" className="w-full bg-white border-r border-surface-200" />;
  }

  if (error) {
    return (
      <div className="w-80 bg-white border-r border-surface-200 flex flex-col p-6">
        <ErrorMessage title="Error Loading Projects" message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-surface-200 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-surface-900">Projects</h2>
          <Button
            onClick={onCreateProject}
            size="icon"
            icon={ApperIcon}
            iconProps={{ name: "Plus", size: 16 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {projects.length === 0 ? (
          <EmptyState
            icon="FolderOpen"
            title="No projects yet"
            description="Create your first project to get started"
            actionButton={
              <Button onClick={onCreateProject}>
                Create Project
              </Button>
            }
          />
        ) : (
          <AnimatePresence>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProjectId === project.id}
                onClick={() => onSelectProject(project)}
                onShare={null} // Sharing handled in main content for selected project
                index={index}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;