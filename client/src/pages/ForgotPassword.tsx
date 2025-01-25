import React from 'react';
import { Col, Form, Row, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, AuthInput, AuthButton } from '../components/Auth';
import { useForgotPasswordMutation } from '../api';

const ForgotPassword: React.FC = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    try {
      await forgotPassword(values).unwrap();
      message.success('Password reset link sent to your email');
      navigate('/login');
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <Form name="forgot_password_form" onFinish={onFinish} layout="vertical">
        <AuthInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          prefixIcon="email"
        />
        <AuthButton loading={isLoading} text="Send Reset Link" />
        <Row justify="center" className="mt-4">
          <Col>
            <Link to="/login" className="text-black hover:text-black">
              Back to Login
            </Link>
          </Col>
        </Row>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;