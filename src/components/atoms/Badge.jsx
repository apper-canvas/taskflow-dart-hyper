const Badge = ({ children, variant, className = '' }) => {
  const variants = {
    statusTodo: 'bg-surface-100 text-surface-700',
    statusInProgress: 'bg-info/10 text-info',
    statusDone: 'bg-success/10 text-success',
    permissionView: 'bg-surface-100 text-surface-700',
    permissionEdit: 'bg-primary/10 text-primary',
    expired: 'bg-error/10 text-error',
    // Add other badge types as needed, e.g., priority
  };

  const defaultStyles = 'px-2 py-1 text-xs font-medium rounded-full';

  return (
    <span className={`${defaultStyles} ${variants[variant] || ''} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;