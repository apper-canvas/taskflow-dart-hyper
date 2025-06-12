import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ApperIcon name="FileQuestion" className="w-16 h-16 text-surface-300 mx-auto" />
        </motion.div>
        <h1 className="mt-4 text-2xl font-display font-bold text-surface-900">Page Not Found</h1>
        <p className="mt-2 text-surface-600">The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/projects')} className="mt-6 px-6 py-2">
          Go to Projects
        </Button>
      </motion.div>
    </div>
  );
}