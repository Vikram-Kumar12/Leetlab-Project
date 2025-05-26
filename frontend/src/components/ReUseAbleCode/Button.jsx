import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // corrected import

const Button = ({ children, to }) => (
  <motion.button
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    variants={{
      rest: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    }}
    className="relative overflow-hidden px-8 py-3 rounded-full shadow-lg font-semibold lg:text-xl  group"
    style={{ fontFamily: "font2" }}
  >
    {/* Glow effect behind the button */}
    <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-yellow-300 via-yellow-400 to-[#FE9332] opacity-30 blur-md group-hover:opacity-60 transition duration-300"></div>

    {/* Animated fill layer from left */}
    <motion.span
      variants={{
        rest: { width: 0 },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-300 to-[#FE9332] z-10"
    />

    {/* Text Layer */}
    <Link
      to={to}
      className="relative z-20 bg-gradient-to-r from-red-500 to-pink-900 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300"
    >
      {children}
    </Link>
  </motion.button>
);

export default Button;
