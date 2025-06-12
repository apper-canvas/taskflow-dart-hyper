import { delay } from '../index';
import shareData from '../mockData/shares.json';

let shares = [...shareData];

const shareService = {
  async getAll() {
    await delay(300);
    return [...shares];
  },

  async getByProjectId(projectId) {
    await delay(200);
    return shares.filter(share => share.projectId === projectId).map(share => ({ ...share }));
  },

  async getById(id) {
    await delay(200);
    const sharelink = shares.find(s => s.id === id);
    if (!sharelink) {
      throw new Error('Share link not found');
    }
    return { ...sharelink };
  },

  async create(share) {
    await delay(400);
    const newShare = {
      id: Date.now().toString(),
      ...share,
      shareLink: `https://taskflow.pro/shared/${Date.now()}`,
      expiresAt: share.expiresAt || null
    };
    shares.push(newShare);
    return { ...newShare };
  },

  async update(id, data) {
    await delay(300);
    const index = shares.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Share link not found');
    }
    shares[index] = { ...shares[index], ...data };
    return { ...shares[index] };
  },

  async delete(id) {
    await delay(300);
    const index = shares.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Share link not found');
    }
    shares.splice(index, 1);
    return { success: true };
  }
};

// Export both as named and default for maximum compatibility
export { shareService };
export default shareService;