import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Explore', id: 'explore' },
    { name: 'Product', id: 'product' },
    { name: 'Developer', id: 'developer' },
    { name: 'Sign In', id: 'signin', isButton: true }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#FFFFFF] navbar-section relative  w-full z-50 transition-all py-2 duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}
    >
      {/* Animated yellow center light */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 w-full h-full bg-yellow-200 opacity-20 blur-2xl rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      <div className=" relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex justify-between items-center h-16">

          {/* Logo and name - Always visible on all screens */}
          <div className="flex-shrink-0 flex items-center">
            <motion.div 
             
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div  whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-black to-[#FE9332] rounded-lg flex items-center justify-center">
                <img src={logo} alt="logo" className='w-10 h-10 md:w-12 md:h-12' />
              </motion.div>
              <motion.span  whileHover={{ scale: 1.05 }} style={{ fontFamily: "font4" }} className="text-2xl md:text-4xl font-bold white ml-1 bg-clip-text text-transparent bg-gradient-to-r from-black to-[#FE9332]">
                LeetLab
              </motion.span>
            </motion.div>
          </div>

          {/* Nav Items - Will stack on small screens */}
          <div className="hidden sm:flex flex-wrap justify-end items-center gap-2 md:gap-8 z-10">
            {navItems.map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ scale: 1.05 }} 
                className="relative"
              >
                {item.isButton ? (
                  <Link
                    to="/signin"
                    className="bg-clip-text text-transparent bg-gradient-to-r from-black to-[#FE9332] px-2 py-1 md:px-3 md:py-2 rounded-full text-sm md:text-xl font-bold transition-colors duration-200 relative after:content-[''] after:absolute after:left-2 md:after:left-3 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FE9332] hover:after:w-full after:transition-all"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div className="relative group">
                    <a
                      href={`#${item.id}`}
                      className="text-black px-2 py-1 md:px-3 md:py-2 rounded-full text-sm md:text-xl transition-colors duration-200 relative after:content-[''] after:absolute after:left-2 md:after:left-3 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FE9332] hover:after:w-full after:transition-all font-semibold"
                    >
                      {item.name}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      
    </motion.nav>
  );
};

export default Navbar;