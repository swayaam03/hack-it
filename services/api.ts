import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: async (name: string, email: string, password: string, phone: string) => {
    const response = await api.post("/auth/register", { name, email, password, phone });
    if (response.data.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (name: string, phone: string, avatar?: string) => {
    const response = await api.patch("/auth/update", { name, phone, avatar });
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
  },
};

// Issues endpoints
export const issuesAPI = {
  createIssue: async (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    latitude?: number;
    longitude?: number;
    image?: string;
  }) => {
    const response = await api.post("/issues", data);
    return response.data;
  },

  getAllIssues: async (filters?: {
    status?: string;
    category?: string;
    priority?: string;
  }) => {
    const response = await api.get("/issues", { params: filters });
    return response.data;
  },

  getUserIssues: async () => {
    const response = await api.get("/issues/user/my-issues");
    return response.data;
  },

  getIssueById: async (id: string) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  updateIssue: async (id: string, data: any) => {
    const response = await api.patch(`/issues/${id}`, data);
    return response.data;
  },

  addComment: async (issueId: string, text: string) => {
    const response = await api.post(`/issues/${issueId}/comments`, { text });
    return response.data;
  },

  deleteIssue: async (id: string) => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },
};

export default api;
