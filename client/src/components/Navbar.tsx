import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    message.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex gap-10"> 
          <Link to="/feed" className="text-white hover:text-gray-300 transition-colors">
            Feed Management
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            Task Management
          </Link>
        </div>
        <div className="ml-auto">
          <button 
            onClick={handleLogout} 
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
