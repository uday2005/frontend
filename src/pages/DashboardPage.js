// src/pages/DashboardPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStatusCard } from '../components/UserStatusCard';
import { AuditLogTable } from '../components/AuditLogTable';
import { 
  getUserStatus, 
  getAuditLog, 
  logoutUser, 
  revokeGoogleCalendar, 
  revokeSlack, 
  revokeAll 
} from '../api/api';

export const DashboardPage = () => {
  // === State Management ===
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For the initial page load
  const [error, setError] = useState(null);       // For page load errors
  const [isActionLoading, setIsActionLoading] = useState(false); // For individual button clicks

  const navigate = useNavigate();

  // === Data Fetching Logic ===
  // This function fetches all necessary data from the backend to render the page.
  // It's wrapped in useCallback for performance, preventing re-creation on every render.
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true); // Show a loading state for the whole page
      setError(null);

      const userData = await getUserStatus();
      setUser(userData);

      // Only fetch the detailed audit log if the user is fully set up.
      if (userData.isLoggedIn && userData.googleConnected && userData.slackConnected) {
        const logData = await getAuditLog();
        setLogs(logData);
      } else {
        // If setup is incomplete, ensure the log is empty.
        setLogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Could not connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Always stop loading, whether success or fail
    }
  }, []); // Empty dependency array means this function is created only once.

  // This hook runs once when the page first loads.
  useEffect(() => {
    refreshData();
  }, [refreshData]);


  // === User Action Handlers ===

  const handleLogout = async () => {
    if (isActionLoading) return; // Prevent multiple clicks
    setIsActionLoading(true);
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      alert("Logout failed. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };
  
const handleRevokeGoogleCalendar = async () => {
    if (window.confirm("Are you sure you want to disconnect your Google account?")) {
      setIsActionLoading(true);
      try {
        await revokeGoogleCalendar(); // <-- Use the new function
        await refreshData();
      } catch (err) {
        alert("Failed to disconnect Google. Please try again.");
      } finally {
        setIsActionLoading(false);
      }
    }
  };
  
  
  const handleRevokeSlack = async () => {
    if (isActionLoading) return;
    if (window.confirm("Are you sure you want to disconnect your Slack account? This will prevent you from giving commands to the agent.")) {
      setIsActionLoading(true);
      try {
        await revokeSlack();
        await refreshData(); // Refresh all page data to show the change
      } catch (err) {
        alert("Failed to disconnect Slack. Please try again.");
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const handleRevokeAll = async () => {
    if (isActionLoading) return;
    if (window.confirm("DANGER: This will permanently delete all your data and permissions. Are you absolutely sure?")) {
      setIsActionLoading(true);
      try {
        await revokeAll();
        navigate('/login'); // After nuking, send them to login
      } catch (err) {
        alert("Failed to revoke all permissions. Please try again.");
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div className="text-white text-center p-10 text-xl">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-500/10 p-8 rounded-lg text-center">{error}</div>;
  }
  
  const isFullyOnboarded = user && user.googleConnected && user.slackConnected;
  


  
 return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {isActionLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <p className="text-white animate-pulse">Processing...</p>
        </div>
      )}
      {/* The User Status Card is always shown and now contains all connection logic */}
      {user && (
        <UserStatusCard 
          user={user} 
          onLogout={handleLogout} 
          onRevokeAll={handleRevokeAll}
          onRevokeGoogleCalendar={handleRevokeGoogleCalendar}
          onRevokeSlack={handleRevokeSlack}
        />
      )}
      
      {/* The Audit Log Table is ONLY shown if the user is fully onboarded */}
      {isFullyOnboarded && (
        <AuditLogTable logs={logs} />
      )}
    </div>
  );
};