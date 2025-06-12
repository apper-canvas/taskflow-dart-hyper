import { delay } from '../index';
import taskData from '../mockData/tasks.json';

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getByProjectId(projectId) {
    await delay(250);
    return tasks.filter(task => task.projectId === projectId).map(task => ({ ...task }));
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(task) {
    await delay(400);
    const newTask = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, data) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    tasks[index] = { 
      ...tasks[index], 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    tasks.splice(index, 1);
    return { success: true };
  },

  async updateStatus(id, status) {
    return this.update(id, { status });
  }
};

export default taskService;