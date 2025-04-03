import React from 'react';

const Auth = ({ onAuthChange }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome</h1>
        <div className="space-y-4">
          <button
            onClick={() => onAuthChange('signup')}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => onAuthChange('login')}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => onAuthChange('guest')}
            className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
