import { delay } from '../index';
import projectData from '../mockData/projects.json';

let projects = [...projectData];

const projectService = {
  async getAll() {
    await delay(300);
    return [...projects];
  },

  async getById(id) {
    await delay(200);
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { ...project };
  },

  async create(project) {
    await delay(400);
    const newProject = {
      id: Date.now().toString(),
      ...project,
      createdAt: new Date().toISOString(),
      sharedWith: [],
      permissions: {}
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, data) {
    await delay(300);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    projects[index] = { ...projects[index], ...data };
    return { ...projects[index] };
  },

  async delete(id) {
    await delay(300);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    projects.splice(index, 1);
    return { success: true };
  }
};

export { projectService };