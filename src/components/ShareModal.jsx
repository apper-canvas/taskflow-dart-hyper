import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { shareService } from '../services';

export default function ShareModal({ project, onClose }) {
  const [shareLinks, setShareLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newShare, setNewShare] = useState({
    permission: 'view',
    expiresAt: ''
  });

  useEffect(() => {
    loadShareLinks();
  }, [project.id]);

  const loadShareLinks = async () => {
    setLoading(true);
    try {
      const links = await shareService.getByProjectId(project.id);
      setShareLinks(links);
    } catch (err) {
      toast.error('Failed to load share links');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShare = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const shareData = {
        projectId: project.id,
        permission: newShare.permission,
        expiresAt: newShare.expiresAt || null
      };
      const createdShare = await shareService.create(shareData);
      setShareLinks(prev => [...prev, createdShare]);
      setNewShare({ permission: 'view', expiresAt: '' });
      toast.success('Share link created successfully');
    } catch (err) {
      toast.error('Failed to create share link');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteShare = async (shareId) => {
    if (!window.confirm('Are you sure you want to delete this share link?')) return;
    
    try {
      await shareService.delete(shareId);
      setShareLinks(prev => prev.filter(share => share.id !== shareId));
      toast.success('Share link deleted successfully');
    } catch (err) {
      toast.error('Failed to delete share link');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const getPermissionBadge = (permission) => {
    const config = {
      view: { label: 'View Only', bg: 'bg-surface-100', text: 'text-surface-700' },
      edit: { label: 'Can Edit', bg: 'bg-primary/10', text: 'text-primary' }
    };
    return config[permission] || config.view;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-surface-900">
                Share Project
              </h2>
              <p className="text-sm text-surface-600 mt-1 break-words">
                {project.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-surface-400 hover:text-surface-600 transition-colors rounded-lg hover:bg-surface-50"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Create New Share Link */}
          <form onSubmit={handleCreateShare} className="mb-6 p-4 bg-surface-50 rounded-lg">
            <h3 className="font-medium text-surface-900 mb-4">Create New Share Link</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Permission
                </label>
                <select
                  value={newShare.permission}
                  onChange={(e) => setNewShare(prev => ({ ...prev, permission: e.target.value }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="view">View Only</option>
                  <option value="edit">Can Edit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Expires On (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={newShare.expiresAt}
                  onChange={(e) => setNewShare(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={creating}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Link'}
              </motion.button>
            </div>
          </form>

          {/* Existing Share Links */}
          <div>
            <h3 className="font-medium text-surface-900 mb-4">Existing Share Links</h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-surface-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : shareLinks.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Link" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                <p className="text-surface-600">No share links created yet</p>
                <p className="text-sm text-surface-500 mt-1">Create your first share link above</p>
              </div>
            ) : (
              <div className="space-y-3 max-w-full overflow-hidden">
                {shareLinks.map((share) => {
                  const permissionBadge = getPermissionBadge(share.permission);
                  const isExpired = share.expiresAt && new Date(share.expiresAt) < new Date();
                  
                  return (
                    <motion.div
                      key={share.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        p-4 border rounded-lg transition-colors
                        ${isExpired ? 'border-error/20 bg-error/5' : 'border-surface-200 bg-white'}
                      `}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <ApperIcon 
                            name={isExpired ? "LinkOff" : "Link"} 
                            size={16} 
                            className={isExpired ? "text-error" : "text-primary"} 
                          />
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${permissionBadge.bg} ${permissionBadge.text}`}>
                            {permissionBadge.label}
                          </span>
                          {isExpired && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-error/10 text-error">
                              Expired
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteShare(share.id)}
                          className="p-1 text-surface-400 hover:text-error transition-colors rounded"
                        >
                          <ApperIcon name="Trash2" size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <code className="flex-1 px-3 py-2 bg-surface-50 text-sm text-surface-700 rounded border min-w-0 break-all">
                          {share.shareLink}
                        </code>
                        <button
                          onClick={() => copyToClipboard(share.shareLink)}
                          disabled={isExpired}
                          className="p-2 text-surface-600 hover:text-primary transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        >
                          <ApperIcon name="Copy" size={16} />
                        </button>
                      </div>
                      
                      {share.expiresAt && (
                        <p className="text-xs text-surface-500">
                          {isExpired ? 'Expired' : 'Expires'} on{' '}
                          {new Date(share.expiresAt).toLocaleString()}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-surface-600 hover:text-surface-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}