import { motion } from "framer-motion";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
import Button from "../ReUseAbleCode/Button";

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-[#FFFFFF] hero-section relative w-full max-w-[100vw] px-4 sm:px-6 lg:px-8 overflow-hidden py-12 bg-no-repeat bg-cover bg-center">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-44 h-44 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between z-10">
        {/* LEFT CONTENT - Text and buttons */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left px-2 sm:px-4 md:px-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-white"
            variants={itemVariants}
          >
            <span
              style={{ fontFamily: "font1" }}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-[#FE9332]"
            >
              Master Coding Interviews{" "}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                With Confidence
              </span>{" "}
            </span>
          </motion.h1>

          <motion.p
            className="mt-2 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-500"
            variants={itemVariants}
          >
            Practice real-world coding questions, track progress, and prepare
            for{" "}
            <span
              style={{ fontFamily: "font4" }}
              className="text-[#FE9332] font-semibold"
            >
              <br className="hidden sm:block" />
              tech interviews—all in one place
            </span>
            .
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            variants={containerVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} variants={itemVariants}>
              <Button to="/problem-section" children="Start Practicing" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button to="/problem-section" children=" Browse Problems" />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-gray-800 text-xs sm:text-sm font-medium text-gray-200"
            >
              <ChartBarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400" />
              500+ Coding Problems
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-gray-800 text-xs sm:text-sm font-medium text-gray-200"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Built with MERN Stack
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT - Shows coding illustration OR code editor based on screen size */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 mt-8 lg:mt-0">
          {/* Coding Illustration - Shows on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20"></div>
              <img
                src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
                alt="Coding Illustration"
                className="relative w-full rounded-xl shadow-2xl border-2 border-gray-700"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div>
        {/* Content div with staggered animations */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 block lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AuthImagePattern
            title={"Welcome to our platform!"}
            subtitle={
              "Sign up to access our platform and start using our services."
            }
          />
        </motion.div>
      </div>
      
    </section>
  );
};

export default HeroSection;