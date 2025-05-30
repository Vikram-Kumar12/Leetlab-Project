import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/profile");

      const user = res.data.data.user;

      // console.log("User data in checkAuth:", user);
      // console.log(":Local Storage :", localStorage.getItem("token"));
      if (localStorage.getItem("token") !== null) {
        // ye mera check kar rha hai ki user ka token local-storage mein hai, agr hai token to access do nhi to phir esko login page pr le jao
        set({ authUser: user });
      }
      // localStorage.removeItem("token"); // To remove token from local storage, It basically used when we want to logout.
    } catch (error) {
      console.log(
        "Check auth error:",
        error?.response?.data?.message || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      // ❌ Don't set authUser yet
      toast.success(
        res.data.message || "Registered! Please verify your email."
      );
    } catch (error) {
      // console.log("errrr2 :",error.response?.data?.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      const user = res.data.data.user; // 🔑 yaha se user object mil raha hai
      const token = res.data.data.accessToken;
      // console.log("User data login :", user);
      // console.log("User token login", token);

      // ✅ You can store the token in localStorage or cookies
      localStorage.setItem("token", token);

      set({ authUser: user });
      toast.success(res.data.message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token"); // ✅ Remove token from localStorage
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Error logging out");
    }
  },

  forgotPassword: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      // console.log("res4", res.data.data.user);

      toast.success(res.data.message || "Please verify your email.");
      // Redirect to sign-in after toast
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "forgotPassword failed");
    }
  },

  changePassword: async (data) => {
    // console.log("data :", data);
    try {
      const res = await axiosInstance.post(
        `/auth/changed-password/${data.token}`,
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }
      );

      // console.log("res2 :", res);
      toast.success(res.data.message || "Password changed successfully");

      // Redirect to sign-in after toast
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "ChangePassword frontend failed"
      );
    }
  },
}));
