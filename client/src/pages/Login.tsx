import { Form, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApi';
import { AuthLayout, AuthInput, AuthCheckbox, AuthButton } from '../components/Auth';

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await login(values).unwrap();
      localStorage.setItem('userToken', res.token);
      message.success('Login successful');
      navigate('/');
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  return (
    <AuthLayout title="Join the BLOG Community">
      <Form name="login_form" onFinish={onFinish} layout="vertical">
        <AuthInput name="email" label="Email" placeholder="Enter your email" prefixIcon="email"  />
        <AuthInput name="password" label="Password" placeholder="Enter your password" type="password" prefixIcon="password"  />
        <AuthCheckbox name="remember" label="Remember me" />
        <AuthButton loading={isLoading} text="Log in" />
        <Row justify="center">
          <Col>
            <Link to="/signup" className="text-black hover:text-black">
              Don't have an account? Register
            </Link>
          </Col>
        </Row>
      </Form>
    </AuthLayout>
  );
};

export default Login;
