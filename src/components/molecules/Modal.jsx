import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Modal = ({ title, onClose, children, className = '', showCloseButton = true, subtitle }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className={`bg-white rounded-lg shadow-xl w-full p-6 max-h-[90vh] overflow-y-auto ${className}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-surface-900">
                {title}
              </h2>
              {subtitle && <p className="text-sm text-surface-600 mt-1 break-words">{subtitle}</p>}
            </div>
            {showCloseButton && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                icon={ApperIcon} // Pass ApperIcon component directly
                iconProps={{ name: "X", size: 20 }} // Pass props for ApperIcon
              />
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;