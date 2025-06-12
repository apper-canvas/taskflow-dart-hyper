import ShareLinkItem from '@/components/molecules/ShareLinkItem';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import EmptyState from '@/components/atoms/EmptyState';
import ApperIcon from '@/components/ApperIcon';

const ShareLinkList = ({ shareLinks, onDeleteShare, onCopyLink, loading }) => {
  return (
    <div>
      <h3 className="font-medium text-surface-900 mb-4">Existing Share Links</h3>
      {loading ? (
        <LoadingSpinner skeletonType="modal" />
      ) : shareLinks.length === 0 ? (
        <EmptyState
          icon="Link"
          title="No share links created yet"
          description="Create your first share link above"
          className="py-8"
        >
          <ApperIcon name="Link" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
        </EmptyState>
      ) : (
        <div className="space-y-3 max-w-full overflow-hidden">
          {shareLinks.map((share) => (
            <ShareLinkItem 
              key={share.id} 
              share={share} 
              onDelete={onDeleteShare} 
              onCopy={onCopyLink} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareLinkList;