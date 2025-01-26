import { Form, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../api';
import { AuthLayout, AuthInput, AuthCheckbox, AuthButton } from '../components/Auth';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const Signup: React.FC = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const { handleGoogleAuthSuccess, handleGoogleAuthFailure } = useGoogleAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await signup(values).unwrap();
      message.success('Signup successful');
      navigate('/login');
    } catch (err: any) {
      message.error(err?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <AuthLayout title="Join the BLOG Community">
      <Form name="signup_form" onFinish={onFinish} layout="vertical">
        <AuthInput name="name" label="Name" placeholder="Enter your name" prefixIcon="name" />
        <AuthInput name="email" label="Email" placeholder="Enter your email" prefixIcon="email" />
        <AuthInput name="password" label="Password" placeholder="Enter your password" type="password" prefixIcon="password" />
        <AuthCheckbox name="terms" label="I accept the terms and conditions" />
        <AuthButton loading={isLoading} text="Sign Up" />
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleAuthSuccess}
            onError={handleGoogleAuthFailure}
            useOneTap
          />
        </div>
        <Row justify="center">
          <Col>
            <Link to="/login" className="text-black hover:text-black">
              Already have an account? Log in
            </Link>
          </Col>
        </Row>
      </Form>
    </AuthLayout>
  );
};

export default Signup;
