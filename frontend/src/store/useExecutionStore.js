import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      // console.log(
      //   "Submission:",
      //   JSON.stringify({
      //     source_code,
      //     language_id,
      //     stdin,
      //     expected_outputs,
      //     problemId,
      //   })
      // );
      const res = await axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      // console.log("Execution Response data:", res.data.data);

      set({ submission: res.data.data });
      toast.success(res.data.message || "Execution successfully!");
    } catch (error) {
      // console.log("Error executing code :", error);
      toast.error(error.response?.data?.message || "Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
  
}));
