import { useState } from "react";
import { motion } from "framer-motion";
import images1 from "../../../public/Images/images1.png";
const floatTransition = {
  repeat: Infinity,
  duration: 3,
  ease: "easeInOut",
  repeatType: "mirror",
};

const Card = ({ className, bg, delay = 0, language, code, output, style }) => (
  <motion.div
    className={`absolute w-[200px] md:w-[240px] lg:w-[280px] h-full rounded-2xl shadow-xl p-6 flex flex-col justify-between ${bg} ${className}`}
    style={style}
    animate={{ x: [-4, 4, -4] }}
    transition={{ ...floatTransition, delay }}
  >
    {/* Top Section */}
    <div className="bg-gradient-to-b shadow-xl-200 h-[60%] rounded-t-md overflow-hidden py-2">
      <div className="w-fit h-fit bg-white/50 rounded text-green-600 font-mono text-sm">
        {language}
      </div>
      <div className="flex space-x-3 mb-4">
        <pre className="text-red-600 p-2 rounded text-xs md:text-sm overflow-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex justify-between items-center bg-white h-[40%] rounded-b-md overflow-hidden p-6">
      <div className="w-fit h-fit bg-zinc-200 rounded text-black font-mono text-sm flex items-center px-2">
        Output: {output}
      </div>

      {/* Play Button */}
      <button
        onClick={() => alert(`Running ${language} code`)}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          width="20"
          height="20"
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
      left: "150",
      top: "50",
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
      left: "0",
      top: "0",
      bg: "bg-green-200",
      delay: 0.5,
      language: "Python",
      code: `def hello_world():
  print("Hello Python!")
  
hello_world()`,
      output: "Hello Python!",
    },
    {
      left: "80",
      top: "30",
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

  return (
    <motion.div id="explore"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 4 }}
      className="w-full  px-4 sm:px-6 lg:px-8  lg:py-0  lg:mb-20 mb-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Right Content at Top */}
        <div className="md:hidden w-full flex flex-col px-5">
          <div className="w-full flex items-center justify-center mb-8">
            <div className="relative w-full h-[240px] max-w-[400px]">
              {/* Left Card - Yellow */}
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className={`z-${(index + 1) * 10}`}
                  style={{
                    left: `${card.left}px`,
                    top: `${card.top || 0}px`,
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

          {/* Left Content */}
          <motion.div
            className="w-full mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="flex items-center justify-center gap-5 mb-6">
              <motion.h1
                style={{ fontFamily: "font1" }}
                className="text-4xl font-bold text-[#35A398] text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Start Exploring
              </motion.h1>
              <img
                src={images1}
                alt="images1"
                className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] bg-transparent"
              />
            </motion.div>

            <motion.p
              className="text-lg text-gray-300 text-center mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              LeetLab’s Explore feature is a structured guide designed to help
              you progress efficiently, offering curated paths that align with
              your programming and career goals.
            </motion.p>
            <motion.p
              className="text-lg text-blue-600 text-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Get Started <span>{">"}</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full flex-col lg:flex-row gap-12 items-center ">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{ backgroundColor: "#1D232A" }}
              className="flex items-center justify-center lg:justify-end  gap-5"
            >
              <motion.h1
                style={{ fontFamily: "font1" }}
                className="text-4xl md:text-5xl font-bold text-[#189288]  text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                Start Exploring
              </motion.h1>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={images1}
                alt="images1"
                className="w-[6rem] h-[6rem]"
                style={{
                  backgroundColor: "transparent",
                  mixBlendMode: "normal",
                }}
              />
            </motion.div>

            <motion.p
              className="text-sm text-gray-200 md:text-center mb-5 lg:text-end mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              LeetLab’s Explore feature is a structured guide designed to help
              you progress efficiently, offering curated paths that align with
              your programming and career goals.
            </motion.p>
            <motion.p
              className="text-md text-blue-600 md:text-center lg:text-end cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Get Started <span>{">"}</span>
            </motion.p>
          </motion.div>

          {/* Right Content */}
          <div className="lg:ml-20 md:w-[40%] lg:w-[30%] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-[600px] h-[360px]"
            >
              {/* Left Card - Yellow */}
              {cards.map((card, index) => (
                // <Card
                //   key={index}
                //   className={`left-${card.left} top-${card.top} z-${
                //     (index + 1) * 10
                //   }`}
                //   bg={card.bg}
                //   delay={card.delay}
                //   language={card.language}
                //   code={card.code}
                //   output={card.output}
                // />
                <Card
                  key={index}
                  className={`z-${(index + 1) * 10}`}
                  style={{
                    left: `${card.left}px`,
                    top: `${card.top || 0}px`,
                  }}
                  bg={card.bg}
                  delay={card.delay}
                  language={card.language}
                  code={card.code}
                  output={card.output}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Explore;
