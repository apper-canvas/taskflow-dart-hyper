import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const ShareLinkItem = ({ share, onDelete, onCopy }) => {
  const isExpired = share.expiresAt && new Date(share.expiresAt) < new Date();
  
  const getPermissionBadgeVariant = (permission) => {
    switch (permission) {
      case 'view': return 'permissionView';
      case 'edit': return 'permissionEdit';
      default: return '';
    }
  };

  return (
    <motion.div
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
          <Badge variant={getPermissionBadgeVariant(share.permission)}>
            {share.permission === 'view' ? 'View Only' : 'Can Edit'}
          </Badge>
          {isExpired && (
            <Badge variant="expired">
              Expired
            </Badge>
          )}
        </div>
        <Button
          onClick={() => onDelete(share.id)}
          variant="ghost"
          size="icon"
          icon={ApperIcon}
          iconProps={{ name: "Trash2", size: 14 }}
          className="p-1"
        />
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <code className="flex-1 px-3 py-2 bg-surface-50 text-sm text-surface-700 rounded border min-w-0 break-all">
          {share.shareLink}
        </code>
        <Button
          onClick={() => onCopy(share.shareLink)}
          disabled={isExpired}
          variant="ghost"
          size="icon"
          icon={ApperIcon}
          iconProps={{ name: "Copy", size: 16 }}
          className="p-2 flex-shrink-0"
        />
      </div>
      
      {share.expiresAt && (
        <p className="text-xs text-surface-500">
          {isExpired ? 'Expired' : 'Expires'} on{' '}
          {new Date(share.expiresAt).toLocaleString()}
        </p>
      )}
    </motion.div>
  );
};

export default ShareLinkItem;