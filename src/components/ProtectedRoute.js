// src/components/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { getUserStatus } from '../api/mockApi'; // We use our API to check status
import { getUserStatus } from '../api/api'; 

export const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserStatus()
      .then(res => {
        setIsLoggedIn(res.isLoggedIn);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // While we're checking, show a loading screen
  if (isLoading) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  // If we're done loading and they are logged in, show the requested page
  if (isLoggedIn) {
    return children;
  }

  // Otherwise, if they are not logged in, redirect them to the login page
  return <Navigate to="/login" replace />;
};