import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../Hook/useAuth';
import { useLocation } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

// const { signIn, signInWithGoogle } = useAuth()
const auth = useAuth();
if (!auth) {
  return null; 
}
const { signIn, signInWithGoogle } = auth;


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    signIn(email, password)
      .then(() => {
        toast.success("Successfully Log in Done ✅");
        // 
        setTimeout(() => {
          navigate(`${location.state ? location.state : '/'}`)
        }, 1000)
      }).catch((error: string) => {
        alert(error)
        toast.error("Log in failed ❌");
      })

  };

  const handleGoogleLogin = async () => {
    signInWithGoogle()
      .then(() => {
        // The signed-in user info.
        // const user = result.user;
        // console.log('Google User:', user);
        toast.success("Signed in with Google ✅");
        setTimeout(() => {
          navigate(`${location.state ? location.state : '/'}`)
        }, 1000)
      })
      .catch((error: string) => {
        console.error('Google sign-in error:', error);
        toast.error("Google Sign-in failed ❌");
      });
  };

  const navigateToRegister = () => {
    navigate('/auth/register');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 ">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-blue-500 transform transition-all hover:scale-[1.01]">
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-500 rounded-full"></div>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="transform transition-all hover:scale-[1.02]">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="transform transition-all hover:scale-[1.02]">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={password}

                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium border-2 border-gray-300 rounded-lg shadow-sm py-3 px-5 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-base">Continue with Google</span>
          </button>
        </div>

        {/* Registration link */}
        <div className="text-center border-t border-gray-200 pt-5">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={navigateToRegister}
            className="mt-2 text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;