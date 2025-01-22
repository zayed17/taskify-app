import { Form, Checkbox } from 'antd';

const AuthCheckbox: React.FC<{ name: string; label: string; }> = ({ name, label }) => {
  return (
    <Form.Item name={name} valuePropName="checked" className="mb-2" rules={[
      {
        required: true,
        message: `You must accept the ${label.toLowerCase()}!`,
      },
    ]}>
      <Checkbox className="text-black">{label}</Checkbox>
    </Form.Item>
  );
};

export default AuthCheckbox;
