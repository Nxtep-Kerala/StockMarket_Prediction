import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (error) {
      setError(
        isLoginMode
          ? "Invalid email or password"
          : "Failed to create an account, Minimum 6 digit password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            {isLoginMode 
              ? "Enter your credentials to access your account" 
              : "Create an account to get started"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-300 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {isLoginMode ? "Login" : "Register"}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
            >
              {isLoginMode ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              {" "}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-all duration-200"
              >
                {isLoginMode ? "Create one" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}