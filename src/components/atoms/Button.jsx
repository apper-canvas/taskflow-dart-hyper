import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-surface-100 text-surface-800 hover:bg-surface-200',
    ghost: 'text-surface-600 hover:text-surface-900 hover:bg-surface-50',
    danger: 'bg-error text-white hover:bg-error/90',
    outline: 'border border-surface-300 text-surface-700 hover:bg-surface-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-2.5 text-lg',
    icon: 'p-2', // For buttons that are purely icons
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classNames = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabledStyles}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'icon' ? 18 : 16} className={children ? 'mr-2' : ''} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'icon' ? 18 : 16} className={children ? 'ml-2' : ''} />}
    </>
  );

  if (whileHover || whileTap) {
    return (
      <motion.button
        whileHover={disabled ? {} : whileHover}
        whileTap={disabled ? {} : whileTap}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {content}
    </button>
  );
};

export default Button;