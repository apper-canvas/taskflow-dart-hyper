import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionButton, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`text-center ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto" />
      </motion.div>
      <h3 className="mt-4 text-lg font-medium text-surface-900">{title}</h3>
      <p className="mt-2 text-surface-600">{description}</p>
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;