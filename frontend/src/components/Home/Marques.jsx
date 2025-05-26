import { motion } from "framer-motion";
import React from "react";

function Marques({ imagesUrl, direction }) {
  const scrollX = direction === "left" ? "-100%" : "100%";

  return (
    <div className="w-full relative overflow-hidden py-10 bg-white">
      {/* Animated yellow center light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-yellow-200 opacity-20 blur-2xl rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "start" }}
        />
      </div>
      
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 md:gap-20 items-center"
          animate={{ 
            x: [0, scrollX],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 20,
          }}
        >
          {[...imagesUrl, ...imagesUrl].map((img, index) => (
            <img
              key={`${index}-${img}`}
              src={img}
              alt="company logo"
              className="h-6 md:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Marques;