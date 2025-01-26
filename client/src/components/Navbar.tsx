import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black p-4">
      <div className="max-w-4xl mx-auto flex justify-center items-center">
        <div className="flex gap-10"> 
          <Link to="/feed" className="text-white hover:text-gray-300 transition-colors">
            Feed Management
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            Task Management
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;