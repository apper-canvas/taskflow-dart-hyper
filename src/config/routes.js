import Projects from '../pages/Projects';
import AllTasks from '../pages/AllTasks';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export const routes = {
  projects: {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'FolderOpen',
    component: Projects
  },
  allTasks: {
    id: 'allTasks',
    label: 'All Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
    component: AllTasks
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
    icon: 'AlertCircle',
    component: NotFound
  }
};

export const routeArray = Object.values(routes);