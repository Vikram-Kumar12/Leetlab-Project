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
      // console.log("forgotPassword data :", data);
    } catch (error) {
      // console.error("forgotPassword error :", error);
    }
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
                Change your password
              </h1>
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

            {/* Submit Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-10 py-2 rounded-md text-2xl  bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer"              
            >
              Submit
            </motion.button>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern />
      
    </div>
  );
};

export default ForgotPasswordPage;
