import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/components/molecules/Modal';
import ShareForm from '@/components/organisms/ShareForm';
import ShareLinkList from '@/components/organisms/ShareLinkList';
import Button from '@/components/atoms/Button';
import { shareService } from '@/services';

const ShareModalOrganism = ({ project, onClose }) => {
  const [shareLinks, setShareLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

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

  const handleCreateShare = async (newShareData) => {
    setCreating(true);
    try {
      const shareData = {
        projectId: project.id,
        permission: newShareData.permission,
        expiresAt: newShareData.expiresAt || null
      };
      const createdShare = await shareService.create(shareData);
      setShareLinks(prev => [...prev, createdShare]);
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

  return (
    <Modal
      title="Share Project"
      subtitle={project.name}
      onClose={onClose}
      className="max-w-2xl"
    >
      <ShareForm onCreateShare={handleCreateShare} loading={creating} />
      <ShareLinkList 
        shareLinks={shareLinks} 
        onDeleteShare={handleDeleteShare} 
        onCopyLink={copyToClipboard} 
        loading={loading} 
      />
      <div className="flex justify-end mt-6">
        <Button onClick={onClose} variant="ghost">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ShareModalOrganism;