import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, UserCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'mentee',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">I want to be a:</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg ${
                    formData.role === 'mentee'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'mentee' })}
                >
                  <UserCircle className="h-5 w-5 mr-2" />
                  Mentee
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center px-4 py-3 border rounded-lg ${
                    formData.role === 'mentor'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'mentor' })}
                >
                  <User className="h-5 w-5 mr-2" />
                  Mentor
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;