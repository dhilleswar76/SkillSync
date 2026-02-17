import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to Student Portal</h1>
        <p className="text-xl mb-8">Your gateway to online learning excellence</p>
        
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-block"
            >
              Register
            </Link>
          </div>
        ) : (
          <Link 
            to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Go to Dashboard
          </Link>
        )}
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-2">Quality Courses</h3>
            <p>Access a wide range of professional courses</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-2">Track Progress</h3>
            <p>Monitor your learning journey in real-time</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-2">Get Certified</h3>
            <p>Earn certificates upon course completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
