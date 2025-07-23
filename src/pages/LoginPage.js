// src/pages/LoginPage.js

import React from 'react';

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-4">Hushh Concord</h1>
      <p className="text-xl text-gray-300 mb-10">Your consent-driven scheduling assistant.</p>
      
      {/* The ONE and ONLY call to action */}
      <a 
        href="http://localhost:5000/api/auth/login/google"  // This points to your backend
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
      >
        Login with Google to Get Started
      </a>
    </div>
  );
};