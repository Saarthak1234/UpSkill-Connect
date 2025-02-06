import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home
  };

  return (
    <nav className="bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-customPurple to-blue-500 bg-clip-text text-transparent">
                UpSkill Connect
              </h1>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center space-x-8">
            <Link to="/" className="text-zinc-50 hover:text-white">Home</Link>
            {isLoggedIn ? (
              <>
                <Link to="/connect" className="text-zinc-50 hover:text-white">Find Mentor</Link>
                <Link to="/counselling" className="text-zinc-50 hover:text-white">AI Counsellor</Link>
                <Link to="/chat" className="text-zinc-50 hover:text-white">Chat</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
