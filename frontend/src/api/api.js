import axios from 'axios';

const API_URL = import.meta.env.PROD ? '/api/' : 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add interceptor for token
api.interceptors.request.use((config) => {
    // Basic session handling would be done automatically by browser with cookies,
    // but we can add Custom Auth Token if needed. For now Django default session works if cors config allows credentials.
    // If using TokenAuth, add it here. Let's assume simplest token approach:
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const login = async (credentials) => {
    const response = await api.post('login/', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('register/', userData);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('logout/');
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('user/');
    return response.data;
};

export const updateUser = async (data) => {
    const response = await api.put('user/', data);
    return response.data;
};

export const forgotPassword = async (data) => {
    const response = await api.post('forgot-password/', data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.post('change-password/', data);
    return response.data;
};

export const deleteAccount = async () => {
    const response = await api.delete('delete-account/');
    return response.data;
};

export const getSettings = async () => {
    const response = await api.get('settings/');
    return response.data;
};

export const updateSettings = async (data) => {
    const response = await api.put('settings/', data);
    return response.data;
};

export const analyzeContent = async (data) => {
    const response = await api.post('analyze/', data);
    return response.data;
};

export const getHistory = async () => {
    const response = await api.get('history/');
    return response.data;
};

export const generateAudioURL = async (text, lang = 'en') => {
    const response = await api.post('generate-audio/', { text, lang }, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
};

export default api;
