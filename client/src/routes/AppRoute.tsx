import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage  from '../pages/Login';
import SignupPage from '../pages/Signup';
import Task from '../pages/TaskManagemnt'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import FeedManagement from '../pages/FeedManagement';
// import HomePage from '../pages/HomePage';
// import AddBlogPage from '../pages/AddBlogPage';
// import BlogListPage from '../pages/BlogListPage';
// import EditBlogPage from '../pages/EditBlogPage';
// import ProtectedRoute from './Protected';
// import PublicRoute from './Public';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/login" element={<LoginPage />}  />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/feed" element={<FeedManagement />} />

        {/* <Route path="/" element={<ProtectedRoute redirectTo='/login' element={HomePage} />} />
        <Route path="/add-blog" element={<ProtectedRoute redirectTo='/login' element={AddBlogPage} />} />
        <Route path="/my-blog" element={<ProtectedRoute redirectTo='/login' element={BlogListPage} />} />
        <Route path="/edit-blog/:id" element={<ProtectedRoute redirectTo='/login' element={EditBlogPage} />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
