// src/api/mockApi.js

// --- The data I promised to send you ---

const fakeUserStatus = {
  isLoggedIn: true,
  userId: "user_g_1122334455",
  displayName: "Alice",
  email: "alice@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=alice", // Using a placeholder image service
  googleConnected: true,
  slackConnected: true
};

const fakeAuditLog = [
  { id: "evt_abc123", timestamp: "2023-10-27T10:05:00Z", event: "Scheduled Meeting", details: "Booked 30min meeting with bob@example.com", status: "Success" },
  { id: "evt_def456", timestamp: "2023-10-27T10:04:55Z", event: "Agent Action", details: "Requested to write to Google Calendar", status: "Success" },
  { id: "evt_ghi789", timestamp: "2023-10-27T10:04:50Z", event: "Agent Action", details: "Requested to read from Google Calendar", status: "Success" },
  { id: "evt_jkl012", timestamp: "2023-10-27T10:04:45Z", event: "Received Slack Command", details: "User requested to book a meeting", status: "In Progress" },
  { id: "evt_mno345", timestamp: "2023-10-26T16:20:00Z", event: "Scheduled Meeting", details: "Could not find a valid time slot", status: "Failed" }
];

// --- Functions that simulate fetching this data ---

export const getUserStatus = () => {
  console.log("Mock API: Fetching user status...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Mock API: Responded with user status.");
      resolve(fakeUserStatus);
    }, 500); // Simulate a 0.5 second network delay
  });
};

export const getAuditLog = () => {
  console.log("Mock API: Fetching audit log...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Mock API: Responded with audit log.");
      resolve(fakeAuditLog);
    }, 800); // Simulate a 0.8 second network delay
  });
};