import { motion } from "framer-motion";
import {
  UserCheck,
  Award,
  Target,
  Lightbulb,
  Trophy,
  Code,
  ShieldCheck,
  Flame,
  Star,
  Users,
} from "lucide-react";

import AuthImagePattern from "../ReUseAbleCode/AuthImagePattern";
function Developer() {

  const activities = [
    {
      icon: <UserCheck className="text-green-500 w-5 h-5" />,
      message: "Aman just solved 5 coding problems.",
    },
    {
      icon: <Award className="text-yellow-500 w-5 h-5" />,
      message: "Riya earned the Gold DSA Badge.",
    },
    {
      icon: <Target className="text-blue-500 w-5 h-5" />,
      message: "Sohan joined Beginner Track: Arrays.",
    },
    {
      icon: <Trophy className="text-purple-500 w-5 h-5" />,
      message: "Pooja ranked #3 in the Weekly Leaderboard.",
    },
    {
      icon: <Lightbulb className="text-orange-400 w-5 h-5" />,
      message: "Karan shared a tip on optimizing recursion.",
    },
    {
      icon: <Code className="text-cyan-600 w-5 h-5" />,
      message: "Neha deployed her first full-stack project!",
    },
    {
      icon: <ShieldCheck className="text-teal-500 w-5 h-5" />,
      message: "Dev passed the Secure Coding Quiz.",
    },
    {
      icon: <Flame className="text-red-500 w-5 h-5" />,
      message: "Meena is on a 15-day coding streak.",
    },
    {
      icon: <Star className="text-yellow-400 w-5 h-5" />,
      message: "Aakash got featured in the Top Contributors.",
    },
    {
      icon: <Users className="text-pink-400 w-5 h-5" />,
      message: "50 new developers joined the community today.",
    },
  ];

  return (
    <div id="developer" className="bg-[#FFFFFF] developer-section w-full flex flex-col md:flex-row items-center justify-between gap-8 px-4 md:px-16 py-12 ">

      {/* left-side content */}
      <motion.div
        className="w-full max-w-7xl mx-auto  h-[600px] lg:max-w-md px-6 py-10  rounded-xl shadow-md overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-yellow-50"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          style={{ fontFamily: "font4" }}
          className="text-xl sm:text-2xl font-bold  mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-[#FE9332]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-zinc-800">👥</span> Live Community Activity
        </motion.h2>

        <div className="space-y-4  overflow-hidden relative">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ y: 0 }}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
          >
            {[...activities, ...activities].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/70 px-4 py-2 rounded-md shadow hover:shadow-lg transition"
              >
                {item.icon}
                <p className="text-sm text-zinc-500">{item.message}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right-side content */}
      <motion.div
        className="hidden w-full  h-[600px] lg:flex flex-col gap-6 max-w-3xl border-b-2 border-b-zinc-200 border-l-2 border-l-zinc-200 border-r-2 border-r-zinc-200 rounded  shadow-md   hover:border-yellow-100 overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-yellow-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={
            "Sign up to access our platform and start using our services."
          }
          color="#ffffff"
        />
      </motion.div>

    </div>
  );
}

export default Developer;
