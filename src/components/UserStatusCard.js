// src/components/UserStatusCard.js
import React from 'react';

// This is our new, combined connection status row component
const ConnectionRow = ({ serviceName, isConnected, onConnect, onRevoke }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300">{serviceName} Connected</span>
      {isConnected ? (
        <button onClick={onRevoke} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-1 px-3 rounded-lg text-xs transition-colors">
          Disconnect
        </button>
      ) : (
        <a href={onConnect} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
          Connect
        </a>
      )}
    </div>
  );
};


export const UserStatusCard = ({ user, onLogout, onRevokeAll,onRevokeGoogleCalendar, onRevokeSlack }) => {
  const { displayName, avatarUrl, email, googleConnected, slackConnected } = user;
  
  // The URLs for our connection links
  const googleConnectUrl = 'http://localhost:5000/api/connect/google/calendar';
  const slackConnectUrl = 'http://localhost:5000/api/connect/slack';

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      {/* Header section with responsive layout */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="flex items-center space-x-4">
          <img src={avatarUrl} alt="User Avatar" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{displayName}</h2>
            <p className="text-gray-400">{email}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0 self-end md:self-auto">
          <button onClick={onRevokeAll} className="bg-red-600/50 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
            Revoke All
          </button>
          <button onClick={onLogout} className="bg-gray-600/50 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
            Log Out
          </button>
        </div>
      </div>
      
      {/* Connection Status Section - Now with buttons! */}
      <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
        <ConnectionRow 
          serviceName="Google Calendar"
          isConnected={googleConnected}
          onConnect={googleConnectUrl}
          onRevoke={onRevokeGoogleCalendar}
        />
        <ConnectionRow 
          serviceName="Slack"
          isConnected={slackConnected}
          onConnect={slackConnectUrl}
          onRevoke={onRevokeSlack}
        />
      </div>
    </div>
  );
};