import React from 'react';
import { Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../api/userApi';
import { AuthLayout, AuthInput, AuthButton } from '../components/Auth';


const ResetPassword: React.FC = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    try {
      if (!token) {
        message.error('Invalid reset token');
        return;
      }
      if (values.password !== values.confirmPassword) {
        message.error('Passwords do not match');
        return;
      }
      await resetPassword({ token, newPassword: values.password }).unwrap();
      message.success('Password reset successfully');
      navigate('/login');
    } catch (error: any) {
      message.error(error.data?.message || 'Failed to reset password');
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <Form name="reset_password_form" onFinish={onFinish} layout="vertical">
        <AuthInput
          name="password"
          label="New Password"
          placeholder="Enter your new password"
          type="password"
        />
        <AuthInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your new password"
          type="password"
        />
        <AuthButton loading={isLoading} text="Reset Password" />
      </Form>
    </AuthLayout>
  );
};

export default ResetPassword;