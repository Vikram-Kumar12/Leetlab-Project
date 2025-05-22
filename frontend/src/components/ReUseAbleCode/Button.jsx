import { motion } from "framer-motion";

const Button = ({ children }) => (
  <motion.button
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    variants={{
      rest:  { scale: 1 },
      hover: { scale: 1.05 },
      tap:   { scale: 0.95 },
    }}
    className="hidden lg:block relative overflow-hidden px-8 py-3 rounded-lg shadow-lg font-semibold text-xl group border-1 border-zinc-900"
    style={{ fontFamily: "font2" }}
  >
    {/* Gradient Fill Layer */}
    <motion.span
      variants={{
        rest:  { width: 0 },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-purple-600 z-0"
    />

    {/* Text Layer */}
    <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
      {children}
    </span>
  </motion.button>
);

export default Button;
