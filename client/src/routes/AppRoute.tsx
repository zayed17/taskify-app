import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage  from '../pages/Login';
import SignupPage from '../pages/Signup';
import Task from '../pages/TaskManagemnt'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import FeedManagement from '../pages/FeedManagement';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute redirectTo='/login' element={Task} />} />
        <Route path="/login" element={<PublicRoute redirectTo='/' element={LoginPage} />} />
        <Route path="/signup" element={<PublicRoute redirectTo='/' element={SignupPage} />} />
        <Route path="/forgot-password" element={<ProtectedRoute redirectTo='/login' element={ForgotPassword} />} />
        <Route path="/reset-password/:token" element={<ProtectedRoute redirectTo='/login' element={ResetPassword} />} />
        <Route path="/feed" element={<ProtectedRoute redirectTo='/login' element={FeedManagement} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
