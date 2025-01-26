import { useGoogleAuthMutation } from '../api';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useGoogleAuth = () => {
  const [login] = useGoogleAuthMutation();
  const navigate = useNavigate();

  const handleGoogleAuthSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);

      const { email, name ,sub} = decoded;
      const res = await login({ email, name ,sub}).unwrap();
      
      localStorage.setItem('userToken', res.token);
      if (res.isNewUser) {
        message.success('Welcome! Your account has been created successfully.');
      } else {
        message.success('Welcome back! Login successful.');
      }
      navigate('/');
    } catch (err: any) {
      message.error('Failed to login with Google');
    }
  };

  const handleGoogleAuthFailure = () => {
    message.error('Google login failed');
  };

  return { handleGoogleAuthSuccess, handleGoogleAuthFailure };
};