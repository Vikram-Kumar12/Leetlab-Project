import React from "react";
import { motion } from "framer-motion";
import images1 from "../../../public/Images/images1.png";
import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
const Developer = () => {
  return (
    <motion.div id="developer"
      className=" w-full min-h-screen  flex flex-col items-center px-4 py-10 lg:py-30 sm:px-6 lg:px-8 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        {/* Image at top with animation */}
        <motion.div className="flex flex-col items-center lg:items-start">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={images1}
            alt="images1"
            className="w-[10rem] h-[10rem]"
          />
        </motion.div>

        {/* Animated paragraph */}
        <motion.p
          className="text-lg lg:text-md text-gray-300 lg:text-gray-300 mb-20 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We now support 3 popular coding languages. At our core, LeetLab is
          about developers. Our powerful development tools such as Playground
          help you test, debug and even write your own projects online.
        </motion.p>

        {/* Content div with staggered animations */}
        <motion.div
          className="w-full flex flex-col gap-6 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AuthImagePattern
            title={"Welcome to our platform!"}
            subtitle={
              "Sign up to access our platform and start using our services."
            }
            // color="#1D232A"
          />
        </motion.div>

      </div>
      
    </motion.div>
  );
};

export default Developer;
