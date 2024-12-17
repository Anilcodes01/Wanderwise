import { api, handleApiError } from "./api";

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async signup(data) {
    try {
      const response = await api.post("/auth/signup", data);
      return response.data.user;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data.user;
    } catch (error) {
      console.error("failed to fetch current user", error);
      return null;
    }
  },
};
