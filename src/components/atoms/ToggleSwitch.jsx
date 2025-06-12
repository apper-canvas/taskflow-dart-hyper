const ToggleSwitch = ({ 
  checked, 
  defaultChecked = false, 
  onChange, 
  className = '', 
  ...props 
}) => {
  // Determine if component should be controlled or uncontrolled
  const isControlled = checked !== undefined;
  
  // Prepare input props to avoid controlled/uncontrolled conflict
  const inputProps = {
    type: "checkbox",
    className: "sr-only peer",
    onChange,
    ...props
  };
  
  // Add either checked or defaultChecked, but never both
  if (isControlled) {
    inputProps.checked = checked;
  } else {
    inputProps.defaultChecked = defaultChecked;
  }

  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input {...inputProps} />
      <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );
};

export default ToggleSwitch;