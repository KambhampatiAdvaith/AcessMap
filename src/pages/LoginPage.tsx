import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/map');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      await login(email, password);
      navigate('/map');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-8">
          <h1 className="text-2xl font-bold text-white text-center">Log In to AccessMap</h1>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 flex items-start bg-red-50 border border-red-200 rounded-md p-3 text-red-600 text-sm">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="mt-1 text-right">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <LogIn className="w-5 h-5 mr-2" />
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <p className="text-xs text-gray-500 text-center">
              For demo purposes, use:
              <br />
              Email: user@accessmap.com
              <br />
              Password: password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;