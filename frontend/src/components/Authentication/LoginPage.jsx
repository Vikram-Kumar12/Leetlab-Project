import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="lg:h-screen grid lg:grid-cols-2 bg-slate-900">
      <div className="flex flex-col  items-center px-3 sm:px-6 py-10 lg:p-12 lg:py-25 ">

        <div className="w-full max-w-md space-y-8 ">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">

              {/* logo and name */}
              <div className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer  "
                >
                  <div className=" bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 "
              >
                Welcome Back
              </h1>
              <p
                style={{ fontFamily: "font4" }}
                className="text-base-content/60 "
              >
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
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full h-[55px] pl-10 text-lg ${
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
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full h-[55px] pl-10 text-lg ${
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
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot-password */}
            <div className="flex items-center justify-between mb-6">
              <label className="label">
                <span
                  style={{ fontFamily: "font4" }}
                  className="label-text font-medium bg-clip-text  text-blue-500"
                >
                  Forgot Password?
                </span>
              </label>

              <Link to="/signup" className="label">
                <span
                  style={{ fontFamily: "font4" }}
                  className="font-medium link link-primary"
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
              className="px-10 py-2 rounded-md text-2xl  bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer"
              // disabled={isSigninUp}
            >
              {/* {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )} */}
              Login
            </motion.button>

          </form>

        </div>
        
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome Back!"}
        subtitle={
          "Sign in to continue your journey with us. Don't have an account? Create one now."
        }
      />

    </div>
  );
};

export default LoginPage;
