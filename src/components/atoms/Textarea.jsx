const Textarea = ({ className = '', rows = 3, ...props }) => {
  const defaultStyles = "w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none";
  return (
    <textarea
      rows={rows}
      className={`${defaultStyles} ${className}`}
      {...props}
    />
  );
};

export default Textarea;