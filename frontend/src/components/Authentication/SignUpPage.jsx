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

  const {signup, isSigninUp} = useAuthStore()
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
      await signup(data)
      console.log("Signup data : ", data);
      reset(); // ⬅️ form fields ko empty karne ke liye
      navigate('/signin')
    } catch (error) {
      console.error("Signup time error",error)
    }
  };

  return (
    <div className="lg:min-h-screen grid lg:grid-cols-2 bg-slate-900 ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
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
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600"
              >
                Welcome
              </h1>
              <p
                style={{ fontFamily: "font4" }}
                className="text-base-content/60"
              >
                Sign Up to your account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Firstname */}
            <div className="form-control mb-6">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
                  First Name
                </span>
              </label>

              <input
                type="text"
                {...register("firstname")}
                className={`input input-bordered w-full h-[50px] pl-10 text-lg ${
                  errors.firstname ? "input-error" : ""
                }`}
                placeholder="First Name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Lastname */}
            <div className="form-control mb-6">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                {...register("lastname")}
                className={`input input-bordered w-full h-[50px] pl-10 text-lg ${
                  errors.lastname ? "input-error" : ""
                }`}
                placeholder="Last Name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="form-control mb-6">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
                  Username
                </span>
              </label>
              <input
                type="text"
                {...register("username")}
                className={`input input-bordered w-full h-[50px] pl-10 text-lg ${
                  errors.username ? "input-error" : ""
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control mb-6">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
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
                  className={`input input-bordered w-full h-[50px] pl-10 text-lg ${
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
            <div className="form-control mb-6">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
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
                  className={`input input-bordered w-full h-[50px] pl-10 text-lg ${
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

            {/* Role */}
            <div className="form-control mb-1 outline-none">
              <label style={{ fontFamily: "font4" }} className="label">
                <span className="label-text font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-600 mb-1">
                  Role
                </span>
              </label>
              <select
                {...register("role")}
                className={`input input-bordered w-full appearance-none pl-3 h-[50px] text-lg pr-8 focus:outline-none focus:ring-0 ${
                  errors.role ? "input-error" : ""
                }`}
              >
                <option value="">Select Role</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Forgot-password */}
            <div className="flex items-center justify-between mb-6">

              <Link to="/signin" className="label">
                <span
                  style={{ fontFamily: "font4" }}
                  className="font-medium link link-primary"
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
              className="px-10 py-2 rounded-md text-2xl  bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome to our platform!"}
        subtitle={
          "Sign up to access our platform and start using our services."
        }
      />

    </div>
  );
};

export default SignUpPage;
