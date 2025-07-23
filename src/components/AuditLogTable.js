// src/components/AuditLogTable.js

import React from 'react';

// StatusBadge component remains the same
const StatusBadge = ({ status }) => {
  const styles = {
    Success: "bg-green-500/20 text-green-300",
    Failed: "bg-red-500/20 text-red-300",
    "In Progress": "bg-yellow-500/20 text-yellow-300",
  };
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

export const AuditLogTable = ({ logs }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-xl font-bold mb-4">Agent Activity Log</h3>
      <div className="space-y-4">
        {logs.map(log => (
          // This is the main card for each log item
          <div key={log.id} className="bg-gray-900/50 p-4 rounded-md">
            
            {/* --- NEW HEADER SECTION --- */}
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg">{log.event}</h4>
              <StatusBadge status={log.status} />
            </div>

            {/* --- NEW DETAILS SECTION --- */}
            <p className="mt-2 text-gray-300">{log.details}</p>
            
            {/* --- NEW TIMESTAMP --- */}
            <p className="mt-3 text-xs text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};