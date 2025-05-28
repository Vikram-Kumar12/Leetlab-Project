import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
      console.log("forgotPassword data :", data);
    } catch (error) {
      console.error("forgotPassword error :", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-900">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 py-10 lg:py-20   ">
        <div className="w-full max-w-md space-y-10 bg-white/10 backdrop-blur-sm  rounded-xl px-5 py-5 border border-white/20 shadow-lg">
          {/* Logo and Title */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
              </div>
              <span
                style={{ fontFamily: "font4" }}
                className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              >
                LeetLab
              </span>
            </motion.div>
            <h1
              style={{ fontFamily: "font4" }}
              className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600"
            >
              Change your password
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                style={{ fontFamily: "font4" }}
                className="block text-lg sm:text-xl font-medium mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full h-[50px] pl-10 text-base sm:text-lg ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 text-lg sm:text-xl rounded-md bg-gradient-to-r from-blue-400 to-purple-600 text-white"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </div>

      {/* Right Side: Always Visible */}
      <div className="flex items-center justify-center px-4 py-10 sm:py-16  ">
        <div className="w-full max-w-[600px]">
          <AuthImagePattern />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
