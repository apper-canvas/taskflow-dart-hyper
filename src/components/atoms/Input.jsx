const Input = ({ className = '', ...props }) => {
  const defaultStyles = "w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  return (
    <input
      className={`${defaultStyles} ${className}`}
      {...props}
    />
  );
};

export default Input;