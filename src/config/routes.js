import ProjectsPage from '@/components/pages/ProjectsPage';
import AllTasksPage from '@/components/pages/AllTasksPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  projects: {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'FolderOpen',
component: ProjectsPage
  },
  allTasks: {
    id: 'allTasks',
    label: 'All Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
component: AllTasksPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
component: SettingsPage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
    icon: 'AlertCircle',
component: NotFoundPage
  }
};

export const routeArray = Object.values(routes);