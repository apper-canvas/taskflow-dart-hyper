import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorMessage = ({ title, message, onRetry }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 mb-2">{title}</h3>
        <p className="text-surface-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;