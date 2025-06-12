import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';

const FormField = ({ 
  label, 
  type = 'text', 
  options = [], 
  className = '', 
  children, 
  ...props 
}) => {
  const renderControl = () => {
    switch (type) {
      case 'textarea':
        return <Textarea {...props}>{children}</Textarea>;
      case 'select':
        return (
          <Select {...props}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      default:
        return <Input type={type} {...props} />;
    }
  };

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      {renderControl()}
    </div>
  );
};

export default FormField;