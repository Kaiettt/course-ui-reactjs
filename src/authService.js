// src/services/authService.js
import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:8080/api/v1';

// In-memory storage for access token
let accessToken = null;

const authService = {
    // Store access token in memory
    setAccessToken: (token) => {
        accessToken = token;
    },

    // Get access token from memory
    getAccessToken: () => accessToken,

    // Clear access token from memory
    clearAccessToken: () => {
        accessToken = null;
    },

    // Login user
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            }, {
                withCredentials: true
            });
            console.log(response.data.data.accessToken)
            // Store access token in memory 
            authService.setAccessToken(response.data.data.accessToken);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            // refreshToken is automatically included in cookies
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                withCredentials: true
            });

            // Store new access token in memory
            authService.setAccessToken(response.data.data.accessToken);
            return response.data.data.accessToken;
        } catch (error) {
            authService.clearAccessToken();
            throw error;
        }
    },


    logout: async () => {
        try {
            // Call logout endpoint to invalidate refresh token
            await axiosInstance.post(`${API_URL}/auth/logout`, {}, {
                withCredentials: true
            });
            authService.clearAccessToken();
        } catch (error) {
            // Clear token even if logout request fails
            authService.clearAccessToken();
            throw error;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!accessToken;
    }
};

export default authService;