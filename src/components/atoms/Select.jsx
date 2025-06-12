const Select = ({ className = '', children, ...props }) => {
  const defaultStyles = "w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  return (
    <select
      className={`${defaultStyles} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;