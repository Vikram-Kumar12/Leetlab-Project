import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      // Error handling remains the same
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900">


      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        
        {/* Left Side - Form - Always shown */}
        <div className="flex-1 flex items-center justify-center px-3 sm:px-6 py-10 lg:p-12 order-1 lg:order-2">
          <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-sm px-5 py-5 rounded-xl border border-white/20 shadow-lg">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                {/* logo and name */}
                <div className="flex-shrink-0 flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <img src={logo} alt="image" className="w-[3rem] h-[3rem]" />
                    </div>
                    <span
                      style={{ fontFamily: "font4" }}
                      className="inline-block text-4xl font-bold white ml-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                      LeetLab
                    </span>
                  </motion.div>
                </div>

                <h1
                  style={{ fontFamily: "font4" }}
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600"
                >
                  Welcome Back
                </h1>
                <p style={{ fontFamily: "font4" }} className="text-white/80">
                  Login to your account
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="">
              {/* Email */}
              <div className="form-control mb-6">
                <label style={{ fontFamily: "font4" }} className="label">
                  <span className="label-text font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
                    Email
                  </span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>

                  <input
                    type="email"
                    {...register("email")}
                    className={`input input-bordered w-full h-[55px] pl-10 text-lg bg-white/10 text-white border-white/20 ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control mb-1">
                <label className="label">
                  <span
                    style={{ fontFamily: "font4" }}
                    className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1"
                  >
                    Password
                  </span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`input input-bordered w-full h-[55px] pl-10 text-lg bg-white/10 text-white border-white/20 ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/40" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/40" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot-password */}
              <div className="flex items-center justify-between mb-6">
                <label className="label">
                  <Link
                    to="/forgot-password"
                    style={{ fontFamily: "font4" }}
                    className="label-text font-medium text-blue-400 hover:text-blue-300"
                  >
                    Forgot Password?
                  </Link>
                </label>

                <Link to="/signup" className="label">
                  <span
                    style={{ fontFamily: "font4" }}
                    className="font-medium text-purple-400 hover:text-purple-300"
                  >
                    SignUp
                  </span>
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-10 py-2 rounded-md text-2xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer text-white w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>

          </div>
        </div>

        {/* Right Side - Image/Pattern - Now shown on mobile too */}
        <div className="flex items-center justify-center px-5 py-10 lg:py-5 order-1 lg:order-2 ">
          <div className="w-full max-w-md lg:max-w-none">
            <AuthImagePattern
              title={"Welcome Back!"}
              subtitle={
                "Sign in to continue your journey with us. Don't have an account? Create one now."
              }
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;