const ColorDot = ({ color, className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };
  return (
    <div
      className={`${sizes[size]} rounded-full flex-shrink-0 ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorDot;