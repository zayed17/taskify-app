import { Form, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api';
import { AuthLayout, AuthInput, AuthCheckbox, AuthButton } from '../components/Auth';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { handleGoogleAuthSuccess, handleGoogleAuthFailure } = useGoogleAuth();

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
        <AuthInput name="email" label="Email" placeholder="Enter your email" prefixIcon="email" />
        <AuthInput name="password" label="Password" placeholder="Enter your password" type="password" prefixIcon="password" />
        <Row justify="space-between" align="middle" >
          <Col>
            <AuthCheckbox name="remember" label="Remember me" />
          </Col>
          <Col>
            <Link to="/forgot-password" className="text-black hover:text-black">
              Forgot Password?
            </Link>
          </Col>
        </Row>

        <AuthButton loading={isLoading} text="Log in" />
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleAuthSuccess}
            onError={handleGoogleAuthFailure}
            useOneTap
          />
        </div>

        <Row justify="center" className="mt-4">
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
