import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const SignUpSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigninUp } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      reset();
      navigate("/signin");
    } catch (error) {
      // console.error("Signup time error",error)
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-900">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16">
        <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl space-y-6 sm:space-y-8 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-6 sm:py-8 rounded-xl border border-white/20 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* logo and name */}
              <div className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <img
                      src={logo}
                      alt="image"
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                    />
                  </div>
                  <span
                    style={{ fontFamily: "font4" }}
                    className="inline-block text-3xl sm:text-4xl font-bold white ml-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                  >
                    LeetLab
                  </span>
                </motion.div>
              </div>

              <h1
                style={{ fontFamily: "font4" }}
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600"
              >
                Welcome
              </h1>
              <p
                style={{ fontFamily: "font4" }}
                className="text-sm sm:text-base text-base-content/60"
              >
                Sign Up to your account
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Firstname */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  First Name
                </span>
              </label>

              <input
                type="text"
                {...register("firstname")}
                className={`input input-bordered w-full h-12 sm:h-14 text-sm sm:text-base ${
                  errors.firstname ? "input-error" : ""
                }`}
                placeholder="First Name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Lastname */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                {...register("lastname")}
                className={`input input-bordered w-full h-12 sm:h-14 text-sm sm:text-base ${
                  errors.lastname ? "input-error" : ""
                }`}
                placeholder="Last Name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  Username
                </span>
              </label>
              <input
                type="text"
                {...register("username")}
                className={`input input-bordered w-full h-12 sm:h-14 text-sm sm:text-base ${
                  errors.username ? "input-error" : ""
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full h-12 sm:h-14 text-sm sm:text-base pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full h-12 sm:h-14 text-sm sm:text-base pl-10 ${
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
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="form-control">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text text-sm sm:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600">
                  Role
                </span>
              </label>
              <select
                {...register("role")}
                className={`select select-bordered w-full h-12 sm:h-14 text-sm sm:text-base ${
                  errors.role ? "select-error" : ""
                }`}
              >
                <option value="">Select Role</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Forgot-password */}
            <div className="flex items-center justify-between pt-2">
              <Link to="/signin" className="label">
                <span
                  style={{ fontFamily: "font4" }}
                  className="text-xs sm:text-sm font-medium link link-primary"
                >
                  Signin
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
              className="w-full px-6 py-2 sm:px-8 sm:py-3 rounded-md text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer flex items-center justify-center"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                  <span className="text-sm sm:text-base">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16">
        <div className="w-full h-full max-w-2xl 2xl:max-w-3xl">
          <AuthImagePattern
            title={"Welcome!"}
            subtitle={
              "Sign up to access our platform and start using our services."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
