// src/api/api.js
import axios from 'axios';

// The address of your Python backend server.
const API_URL = 'http://localhost:5000/api';

// We create a special version of axios that knows the server's address
// and knows to send cookies with every request.
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CRITICAL: This sends the backend's session cookie
});

// --- The Real API Functions ---

export const getUserStatus = async () => {
  // This function now makes a REAL network request to your Python server
  const response = await apiClient.get('/user/status');
  return response.data; // Return the JSON data from the server
};

export const getAuditLog = async () => {
  const response = await apiClient.get('/user/audit-log');
  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/logout');
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const revokeGoogleCalendar = async () => {
  try {
    const response = await apiClient.post('/revoke/google/calendar');
    return response.data;
  } catch (error){
    console.error("Error revoking Google Calendar connection:", error);
    throw error;
  }
};

export const revokeSlack = async () => {
  try {
    const response = await apiClient.post('/revoke/slack');
    return response.data;
  } catch (error) {
    console.error("Error revoking Slack connection:", error);
    throw error;
  }
};

export const revokeAll = async () => {
  try {
    const response = await apiClient.post('/revoke/all');
    return response.data;
  } catch (error) {
    console.error("Error revoking all permissions:", error);
    throw error;
  }
};