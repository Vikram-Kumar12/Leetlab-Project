import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");

      // console.log("GetAllSubmissions Response data :", res.data.data);
      set({ submissions: res.data.data });

      // toast.success(res.data.message || "All submission get successfully!");
    } catch (error) {
      // console.log("Error getting all submissions", error);
      toast.error(
        error.response?.data?.message || "Error getting all submissions"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );
      // console.log("GetSubmissionForProblem response data1 :", res.data.data);
      // console.log("GetSubmissionForProblem response data2 :", res.data);
      set({ submission: res.data.data });
      
    } catch (error) {
      // console.log("Error getting submissions for problem", error);
      toast.error(
        error.response?.data?.message || "Error getting submissions for problem"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );
      // console.log(
      //   "GetSubmissionCountForProblem response data :",
      //   res.data.data.count
      // );

      set({ submissionCount: res.data.data.count });
      // set({ submissionCount: res.data.count });
    } catch (error) {
      // console.log("Error getting submission count for problem", error);
      toast.error(
        error.response?.data?.message ||
          "Error getting submission count for problem"
      );
    }
  },
  
}));
