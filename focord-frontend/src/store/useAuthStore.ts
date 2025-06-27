import { axiosInstance } from "@/lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  avatarUrl: string;
  // Add other user properties as needed
}

interface SignupData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UpdateProfileData {
  userName: string;
  avatarUrl: string;
}

interface AuthStore {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  isSigningUp: boolean;
  signup: (userData: SignupData) => Promise<void>;
  isLoggingIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoggingOut: boolean;
  logout: () => Promise<void>;
  isUpdatingProfile: boolean;
  update: (data: UpdateProfileData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginCredentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // TODO: Implement update profile function
  update: async () => {
    try {
      set({ isUpdatingProfile: true });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
