import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { validationRules } from '../../utils/validation';



interface AuthInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  prefixIcon?: 'email' | 'password' | 'name';

}

const iconMap = {
  email: <MailOutlined className="text-gray-400" />,
  password: <LockOutlined className="text-gray-400" />,
  name: <UserOutlined className="text-gray-400" />,
};

const AuthInput: React.FC<AuthInputProps> = ({ name, label, placeholder, type = 'text', prefixIcon }) => {
  return (
    <Form.Item name={name} label={label} rules={validationRules[name]} className="mb-4">
      {type === 'password' ? (
        <Input.Password size="large" prefix={iconMap[prefixIcon || '']} placeholder={placeholder} className="rounded-lg" />
      ) : (
        <Input size="large" prefix={iconMap[prefixIcon || '']} placeholder={placeholder} className="rounded-lg" />
      )}
    </Form.Item>
  );
};

export default AuthInput;
