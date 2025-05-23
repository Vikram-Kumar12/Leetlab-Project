import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ReUseAbleCode/Button";
import { Link } from "react-router";
const Hero = () => {
  const [size, setSize] = useState(0);
  const requestRef = useRef();
  const speed = 0.02; // Controls how fast it grows (tweak as needed)

  useEffect(() => {
    const animate = () => {
      setSize(prev => {
        let next = prev + speed;
        if (next >= 5) next = 0; // Reset smoothly to 0 after reaching 5
        return next;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  return (

    <div className="text-white lg:flex lg:items-center lg:justify-center px-4 sm:px-6 lg:px-8 mb-10  py-10">
      <div className="max-w-7xl lg:mx-auto flex lg:flex-row lg:items-center lg:gap-12 ">

        {/* Left side - Image (hidden on mobile) */}
        <motion.div
          className="hidden lg:block flex-1 "
          initial={{ rotate: -10 }}
          animate={{ rotate: -10 }}
          whileHover={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-[500px] h-[400px] bg-white flex px-5 py-5 rounded-2xl shadow-2xl items-center justify-center"
          >
            <div className="w-[60%] h-full  rounded-l-2xl flex flex-col gap-3 border-2 border-gray-300 overflow-hidden">
              <div className="w-full h-[27%]  flex gap-3 px-1 py-4 bg-[#F0F4FA] ">
                <div className="w-[22%] h-full bg-gradient-to-b rounded-md from-blue-300 to-[#12CDEE]"></div>
                <div className="w-[22%] h-full bg-gradient-to-b rounded-md from-green-300 to-[#97D05A] "></div>
                <div className="w-[22%] h-full bg-gradient-to-b rounded-md from-yellow-200 to-[#FFC439] "></div>
                <div className="w-[22%] h-full bg-gradient-to-b rounded-md from-red-200 to-[#FF6768] "></div>
              </div>

              <div className="w-full h-[60%]  rounded-2xl flex flex-col gap-1 px-2 py-2 ">
                <div className="w-full h-[20%] bg-white rounded-md flex items-center justify-between px-3 border-[1px] border-gray-400">
                  <span className="inline-block w-[70%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[15%] h-2 bg-[#d2f1b1] rounded-md"></span>
                </div>
                <div className="w-full h-[20%] bg-white rounded-md flex items-center justify-between px-3 border-[1px] border-gray-400">
                  <span className="inline-block w-[60%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[15%] h-2 bg-[#f0d595] rounded-md"></span>
                </div>
                <div className="w-full h-[20%] bg-white rounded-md flex items-center justify-between px-3 border-[1px] border-gray-400">
                  <span className="inline-block w-[65%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[15%] h-2 bg-[#f0a4a4] rounded-md"></span>
                </div>
                <div className="w-full h-[20%] bg-white rounded-md flex items-center justify-between px-3 border-[1px] border-gray-400">
                  <span className="inline-block w-[50%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[15%] h-2 bg-[#d2f1b1] rounded-md"></span>
                </div>
                <div className="w-full h-[20%] bg-white rounded-md flex items-center justify-between px-3 border-[1px] border-gray-400">
                  <span className="inline-block w-[60%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[15%] h-2 bg-[#f0d595] rounded-md"></span>
                </div>
              </div>
            </div>

            <div className="w-[30%] h-full  rounded-r-2xl  border-2 border-gray-300 overflow-hidden">
              <div className="w-full h-[50%] flex flex-col gap-5 px-3 py-4 bg-[#F0F4FA]">
                <div className="w-full h-[30px] bg-gradient-to-b rounded-t-md bg-gray-400"></div>
                <div className="w-[100px] h-[100px] bg-gradient-to-b rounded-full bg-[#96D1F9] flex items-center justify-center relative mx-auto">
                  <div
                    style={{
                      width: `${size}rem`,
                      height: `${size}rem`,
                    }}
                    className="rounded-full bg-green-600 transition-all duration-300"
                  ></div>
                </div>
              </div>

              <div className="w-full h-[60%]  rounded-2xl flex flex-col gap-5 px-2 py-2 ">
                <div className="flex flex-col gap-2">
                  <span className="inline-block w-[70%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[65%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[60%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[55%] h-2 bg-zinc-300 rounded-md"></span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="inline-block w-[80%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[75%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[60%] h-2 bg-zinc-300 rounded-md"></span>
                  <span className="inline-block w-[50%] h-2 bg-zinc-300 rounded-md"></span>
                </div>
              </div>
              
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Content (centered on mobile) */}
        <motion.div
          className="flex-1 text-center  lg:mt-0 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span
              style={{ fontFamily: "font1" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              A New Way to Learn
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-xl text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            LeetLab is the ultimate platform to enhance your coding skills,
            deepen your problem-solving abilities, and get interview-ready with
            hands-on practice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center"
          >
            <Button
              children="Create Account"
              to="/signin"
            />
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
            <Link to="/signin"
              style={{ fontFamily: "font2" }} 
              className="block lg:hidden px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold rounded-lg text-xl shadow-lg"
            >
              Create Account
            </Link>
            </motion.div>
          </motion.div>

        </motion.div>
        
      </div>
    </div>
    
  );
};

export default Hero;
