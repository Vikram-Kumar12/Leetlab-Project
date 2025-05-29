import { motion } from "framer-motion";
import { useState } from "react";
import Playlist from "./Playlist";

const RightSidePage = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <motion.div
      className="w-full h-full bg-slate-900 rounded-md min-h-[500px] px-3 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <h1 style={{fontFamily:"font4"}} className="mb-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-red-600  hover:text-white">Problem Solved</h1>
      {/* Header */}
      <div className="bg-slate-800 w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 px-4 py-6 rounded-lg">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-lg">
            {/* Solved Circle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-[140px] h-[140px] flex flex-col items-center justify-center bg-slate-800 rounded-full border-4 border-slate-600"
            >
              <h1 className="text-lg font-semibold">
                <span className="text-white text-xl">0</span>
                <span className="mx-1">/</span>
                <span className="text-zinc-500 text-xl">10</span>
              </h1>
              <h1
                style={{ fontFamily: "font1" }}
                className="text-green-500 text-xl"
              >
                Solved
              </h1>
            </motion.div>

            {/* Difficulty Stats */}
            <div
              style={{ fontFamily: "font1" }}
              className="w-full sm:w-1/2 flex flex-col gap-3"
            >
              {[
                { label: "Easy", color: "text-green-500" },
                { label: "Med.", color: "text-yellow-500" },
                { label: "Hard", color: "text-red-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-700 px-3 py-3 rounded-md shadow"
                >
                  <h3 className={`text-lg ${item.color}`}>{item.label}</h3>
                  <h6 className="text-white">0</h6>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-lg">
            {/* Submissions Circle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-[140px] h-[135px] flex flex-col items-center justify-center bg-slate-800 rounded-full border-4 border-slate-600"
            >
              <h1 className="text-white text-2xl font-bold">0</h1>
              <h1
                style={{ fontFamily: "font1" }}
                className="text-green-500 text-xl"
              >
                Submissions
              </h1>
            </motion.div>

            {/* Language Stats */}
            <div
              style={{ fontFamily: "font1" }}
              className="w-full sm:w-1/2 flex flex-col gap-3"
            >
              {[
                { label: "JavaScript", color: "text-green-500" },
                { label: "Python", color: "text-yellow-500" },
                { label: "Java", color: "text-red-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-700 px-3 py-3 rounded-md shadow"
                >
                  <h3 className={`text-lg ${item.color}`}>{item.label}</h3>
                  <h6 className="text-white">0</h6>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      
      <div> <Playlist/> </div>
    </motion.div>
  );
};

export default RightSidePage;
