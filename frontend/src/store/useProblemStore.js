import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [], // esme ham /get-all-problems ko access karenge or store karenge, esme ham sare problem ko access karenge uske liye ham array ka use kar rhe hai store karne ke liye.
  problem: null, // esme ham /get-problem/:id ko access karenge or store karenge, ye ak 'id' se access karene or ye sigle data hoga mera
  solvedProblems: [], // aha pr ham basically current login user kitna problem solved kiya hai usko store karenge.
  isProblemsLoading: false, // for ui
  isProblemLoading: false, // for ui

  getAllProblems: async () => {
    set({ isProblemsLoading: true });
    try {
      const res = await axiosInstance.get("/problems/get-all-problems");
      // console.log("Get all problems :", res.data.data);
      set({ problems: res.data.data });
      // toast.success(res.data.message || "Get all problems successfully!");
    } catch (error) {
      // console.log("Get problems time error :", error);
      toast.error(
        error.response?.data?.message || "Get problems request failed!"
      );
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    set({ isProblemLoading: true });
    try {
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      // console.log("Get problem by id data :", res.data.data);
      set({
        problem: res.data.data,
      });
      // console.log("Get problem by id data :", problem.title);
      // toast.success(res.data.message || "Problem get by id successfully!");
    } catch (error) {
      // console.log("Get problem time error :", error);
      throw error; // Re-throw the error for component to handle
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      // console.log("Get solved problem by user data :", res.data.data);
      set({ solvedProblems: res.data.data });
    } catch (error) {
      // console.log("Get solved problems by user time error :", error);
      toast.error(
        error.response?.data?.message ||
          "Get solved problems by user request failed!"
      );
    }
  },

}));
