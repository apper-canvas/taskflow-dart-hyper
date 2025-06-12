import ApperIcon from '@/components/ApperIcon';

const SectionHeader = ({ icon, title }) => {
  return (
    <div className="flex items-center space-x-3 mb-4">
      {icon && <ApperIcon name={icon} className="text-primary" size={20} />}
      <h2 className="text-lg font-medium text-surface-900">{title}</h2>
    </div>
  );
};

export default SectionHeader;