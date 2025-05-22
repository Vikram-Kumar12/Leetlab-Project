import React from "react";
import { motion } from "framer-motion";
import images2 from "../../../public/Images/images2.png";
import images3 from "../../../public/Images/images3.png";
const Product = () => {
  return (
    <div id="product" className="flex w-full flex-col lg:flex-row lg:gap-12 items-center justify-between  md:px-10 px-5 ">
      {/* Left Content */}
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex flex-col items-center lg:items-start">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={images2}
            alt="images2"
            className="w-[10rem] h-[10rem] bg-transparent"
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "normal",
            }}
          />
          <motion.h1
            style={{ fontFamily: "font1" }}
            className="text-2xl font-bold text-blue-400 mb-3 text-center lg:text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            Questions, Community & Contests
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-md text-gray-300 mb-5 text-center lg:text-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Over 3750 questions for you to practice. Come and join one of the
          largest tech communities with hundreds of thousands of active users
          and participate in our contests to challenge yourself and earn
          rewards.
        </motion.p>

        <motion.p
          className="text-md text-blue-600 cursor-pointer text-center lg:text-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          View Questions <span>{">"}</span>
        </motion.p>
      </motion.div>

      {/* Right Content */}
      <motion.div
        className="lg:w-1/2 "
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex flex-col items-center lg:items-start">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={images3}
            alt="images3"
            className="w-[10rem] h-[10rem]"
          />
          <motion.h1
            style={{ fontFamily: "font1" }}
            className="text-2xl font-bold text-[#E0C461] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            Companies & Candidates
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-md text-gray-300 mb-5 text-center lg:text-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Not only does LeetLab prepare candidates for technical interviews, we
          also help companies identify top technical talent. From sponsoring
          contests to providing online assessments and training, we offer
          numerous services to businesses.
        </motion.p>

        <motion.p
          className="text-md text-blue-600 cursor-pointer text-center lg:text-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Business Opportunities <span>{">"}</span>
        </motion.p>
      </motion.div>
      
    </div>
  );
};

export default Product;
