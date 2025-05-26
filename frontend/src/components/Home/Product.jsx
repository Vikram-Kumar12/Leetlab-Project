import React from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
  Cpu,
  Users,
  ShieldCheck,
  Code,
  Zap,
  GitPullRequest,
  BarChart2,
} from "lucide-react";

const products = [
  {
    icon: <Puzzle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-500" />,
    title: "Intelligent Problem Matching",
    description:
      "Our AI-powered engine recommends problems based on your skill level, learning pace, and historical performance. Get personalized roadmaps for DSA, frontend, and system design.",
    extended: [
      "Adaptive difficulty adjustment",
      "Topic-wise progress tracking",
      "Company-specific question banks",
    ],
  },
  {
    icon: <Cpu className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />,
    title: "Real-Time Code Execution",
    description:
      "Run code instantly in 15+ languages with cloud-based execution. Get detailed runtime analysis, memory usage stats, and optimization suggestions.",
    extended: [
      "Multi-file project support",
      "Custom test case creation",
      "Performance benchmarking",
    ],
  },
  {
    icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-rose-500" />,
    title: "Collaborative Coding Rooms",
    description:
      "Pair-program with friends or interview candidates in real-time. Features multi-cursor editing, voice chat, and shared whiteboard.",
    extended: [
      "Interview simulation mode",
      "Code playback review",
      "Permission controls",
    ],
  },
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-500" />,
    title: "Secure & Scalable Backend",
    description:
      "Enterprise-grade infrastructure with 99.9% uptime. All code executions are sandboxed for maximum security.",
    extended: [
      "Regular security audits",
      "Auto-scaling cloud architecture",
      "Encrypted data storage",
    ],
  },
  {
    icon: <Code className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />,
    title: "Smart Code Analysis",
    description:
      "Get AI-powered code reviews with suggestions for improvements. Detects anti-patterns and suggests optimizations.",
    extended: [
      "Style consistency checks",
      "Complexity analysis",
      "Vulnerability scanning",
    ],
  },
  {
    icon: <GitPullRequest className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />,
    title: "Version Control Integration",
    description:
      "Seamless GitHub/GitLab integration. Practice directly from your PRs and get feedback on your commits.",
    extended: [
      "PR review simulation",
      "Git history visualization",
      "Conflict resolution practice",
    ],
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-500" />,
    title: "Instant Interview Prep",
    description:
      "Mock interviews with real questions from top companies. Get detailed feedback on your performance.",
    extended: [
      "Behavioral question bank",
      "Whiteboard simulation",
      "Video recording review",
    ],
  },
  {
    icon: <BarChart2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-500" />,
    title: "Progress Analytics",
    description:
      "Comprehensive dashboards track your improvement across multiple dimensions with actionable insights.",
    extended: [
      "Weakness identification",
      "Learning velocity metrics",
      "Comparison benchmarks",
    ],
  },
];

const Product = () => {
  return (
    <section className="product-section w-full bg-gradient-to-b" id="product">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24"
        >
          <h2
            style={{ fontFamily: "font1" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-600 mb-3 sm:mb-4"
          >
            Developer Experience{" "}
            <span className="text-white dark:text-transparent">Redefined</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            Everything you need to go from beginner to interview-ready in one
            powerful platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 px-4 sm:px-0">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-200 bg-gradient-to-r from-white to-orange-200 hover:border-yellow-400 shadow-sm hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="flex flex-col h-full">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-5">
                  <div className="p-2 sm:p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    {product.icon}
                  </div>
                  <h3
                    style={{ fontFamily: "font4" }}
                    className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl font-semibold text-gray-800 pt-0 sm:pt-1"
                  >
                    {product.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-900 dark:text-gray-600 mb-3 sm:mb-4 flex-grow">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;