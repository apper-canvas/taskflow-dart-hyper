import { motion } from 'framer-motion';

const LoadingSpinner = ({ className = 'h-full flex', skeletonType = 'fullPage' }) => {
  const fullPageSkeleton = (
    <div className="h-full flex">
      <div className="w-80 bg-white border-r border-surface-200 p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="animate-pulse"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg">
              <div className="w-4 h-4 bg-surface-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-surface-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-surface-200 rounded w-1/2"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-surface-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const listPageSkeleton = (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-surface-200 rounded w-1/4"></div>
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-surface-200 rounded w-32"></div>
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-24 bg-surface-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const kanbanSkeleton = (
    <div className="flex space-x-6 h-full">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-1 min-w-80 max-w-sm"
        >
          <div className="bg-white rounded-lg border border-surface-200 h-full p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-surface-200 rounded w-1/2"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-surface-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const modalSkeleton = (
    <div className="space-y-3">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-16 bg-surface-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  const skeletons = {
    fullPage: fullPageSkeleton,
    listPage: listPageSkeleton,
    kanban: kanbanSkeleton,
    modal: modalSkeleton,
  };

  return (
    <div className={className}>
      {skeletons[skeletonType]}
    </div>
  );
};

export default LoadingSpinner;