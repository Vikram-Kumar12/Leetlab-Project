
import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Lightbulb, Code, BarChart2, ChevronRight, Trophy } from "lucide-react";
import Button from "../ReUseAbleCode/Button";

const floatTransition = {
  repeat: Infinity,
  duration: 3,
  ease: "easeInOut",
  repeatType: "mirror",
};

const Card = ({ className, bg, delay = 0, language, code, output, style }) => (
  <motion.div
    className={`absolute w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-full rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col justify-between ${bg} ${className}`}
    style={style}
    animate={{ x: [-4, 4, -4] }}
    transition={{ ...floatTransition, delay }}
  >
    {/* Top Section */}
    <div className="bg-gradient-to-b shadow-xl-200 h-[60%] rounded-t-md overflow-hidden py-2">
      <div className="w-fit h-fit bg-white/50 rounded text-green-600 font-mono text-xs sm:text-sm">
        {language}
      </div>
      <div className="flex space-x-3 mb-4">
        <pre className="text-red-600 p-2 rounded text-xs sm:text-sm overflow-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex justify-between items-center bg-white h-[40%] rounded-b-md overflow-hidden p-4 sm:p-6">
      <div className="w-fit h-fit bg-zinc-200 rounded text-black font-mono text-xs sm:text-sm flex items-center px-2">
        Output: {output}
      </div>

      {/* Play Button */}
      <button
        onClick={() => alert(`Running ${language} code`)}
        className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="sm:w-5 sm:h-5"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  </motion.div>
);

const Explore = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      left: "100px",
      top: "50px",
      bg: "bg-yellow-100",
      delay: 0,
      language: "Java",
      code: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello Java!");
  }
}`,
      output: "Hello Java!",
    },
    {
      left: "0px",
      top: "0px",
      bg: "bg-green-200",
      delay: 0.5,
      language: "Python",
      code: `def hello_world():
  print("Hello Python!")
  
hello_world()`,
      output: "Hello Python!",
    },
    {
      left: "50px",
      top: "30px",
      bg: "bg-gradient-to-b from-cyan-400 to-cyan-500",
      delay: 1,
      language: "JavaScript",
      code: `function helloWorld() {
  console.log("Hello JS!");
}
  
helloWorld();`,
      output: "Hello JS!",
    },
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />,
      title: "Practice DSA",
      desc: "Solve high-quality data structures and algorithms problems with instant feedback.",
      stat: "1000+ problems solved daily",
    },
    {
      icon: <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />,
      title: "Track Progress",
      desc: "Monitor your performance and build consistent coding streaks.",
      stat: "85% users improve in 30 days",
    },
    {
      icon: <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />,
      title: "Get Hints & Solutions",
      desc: "Stuck somewhere? Access hints, discussions and video explanations.",
      stat: "500+ video explanations",
    },
    {
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />,
      title: "Join Live Contests",
      desc: "Compete in weekly and monthly contests to improve speed and accuracy.",
      stat: "10K+ users participate weekly",
    },
  ];

  return (
    
    <motion.div
      id="explore"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 4 }}
      className="bg-[#FFFFFF] explore-section w-full px-4 sm:px-6 lg:px-8 py-8 lg:pt-12 "
    >
      <div className=" max-w-7xl mx-auto">
        
        {/* Mobile Layout */}
        <div className="lg:hidden w-full flex flex-col">
          {/* Top content - Cards */}
          <div className="w-full flex items-center justify-center mb-25">
            <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] max-w-[400px]">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className={`z-${(index + 1) * 10}`}
                  style={{
                    left: card.left,
                    top: card.top,
                  }}
                  bg={card.bg}
                  delay={card.delay}
                  language={card.language}
                  code={card.code}
                  output={card.output}
                />
              ))}
            </div>
          </div>

          {/* Middle Content */}
          <div className="w-full px-2 sm:px-4 space-y-6 sm:space-y-8">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              style={{ fontFamily: "font1" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-500"
            >
              Why Choose <span className="text-yellow-500">LeetLab?</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    hover: { duration: 0.2 },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-gradient-to-r from-white to-orange-200 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl border border-gray-200 hover:border-yellow-400 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                  <div className="mb-3 sm:mb-4">{feature.icon}</div>
                  <h3
                    style={{ fontFamily: "font4" }}
                    className="text-xl sm:text-2xl font-semibold mb-2 text-black"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                    {feature.desc}
                  </p>
                  <div className="text-xs sm:text-sm text-yellow-600 font-medium mb-3 sm:mb-4">
                    {feature.stat}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors text-sm sm:text-base"
                  >
                    Learn more
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6 sm:mt-8"
            >
              <Button children="Start Your Coding Journey Today" to="/signin" />
            </motion.div>
          </div>

          {/* Bottom Content */}
          <div className="mt-8 sm:mt-12">
            <div className="w-full flex items-center justify-center px-2 sm:px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="relative bg-[#0f172a] text-green-400 font-mono p-4 sm:p-6 rounded-2xl shadow-[0_0_20px_#facc15] sm:shadow-[0_0_30px_#facc15] w-full max-w-md"
              >
                <div className="absolute top-2 left-2 flex space-x-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></span>
                </div>

                <pre className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {`function solveProblem(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sum += arr[i];
    }
  }
  return sum;
}`}
                </pre>
                <div className="flex justify-end mt-3 sm:mt-4 text-yellow-400 text-xs sm:text-sm">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  LeetLab Compiler
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full justify-between gap-8 xl:gap-12">
          {/* Left Content */}
          <div className="w-1/2 px-4 py-8 space-y-8">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              style={{ fontFamily: "font1" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl xl:text-5xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-500"
            >
              Why Choose <span className="text-yellow-500">LeetLab?</span>
            </motion.h2>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    hover: { duration: 0.2 },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-gradient-to-r from-white to-orange-200 rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-200 hover:border-yellow-400 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                  <div className="mb-4">{feature.icon}</div>
                  <h3
                    style={{ fontFamily: "font4" }}
                    className="text-2xl font-semibold mb-2 text-black"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.desc}</p>
                  <div className="text-sm text-yellow-600 font-medium mb-4">
                    {feature.stat}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                  >
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <Button children="Start Your Coding Journey Today" to="/signin" />
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[320px] xl:h-[360px] max-w-[500px]"
            >
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className={`z-${(index + 1) * 10}`}
                  style={{
                    left: card.left,
                    top: card.top,
                  }}
                  bg={card.bg}
                  delay={card.delay}
                  language={card.language}
                  code={card.code}
                  output={card.output}
                />
              ))}
            </motion.div>

            <div className="mt-30 w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="relative bg-[#0f172a] text-green-400 font-mono p-6 rounded-2xl shadow-[0_0_30px_#facc15] w-full"
              >
                <div className="absolute top-2 left-2 flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>

                <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                  {`function solveProblem(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sum += arr[i];
    }
  }
  return sum;
}`}
                </pre>
                <div className="flex justify-end mt-4 text-yellow-400">
                  <Code2 className="w-5 h-5 mr-2" />
                  LeetLab Compiler
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Explore;