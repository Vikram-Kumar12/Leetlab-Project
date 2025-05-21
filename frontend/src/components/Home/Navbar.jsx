import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from "../../../public/logo.png"
import {Link} from "react-router-dom"
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav items
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
      className={`w-full z-50 ${isScrolled ? ' shadow-2xl' : 'bg-transparent'} transition-all duration-300  py-5 hidden md:block `}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex justify-between items-center h-16">

          {/* Logo and name */}
          <div className="flex-shrink-0 flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <img src={logo} alt="image" />
              </div>
              <span style={{ fontFamily: "font4" }} className="text-2xl font-bold white ml-1">LeetLab</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {item.isButton ? (
                  <Link to="/signin"
                    whileHover={{ 
                      backgroundColor: '#ffffff',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:bg-white hover:text-gray-900 font-medium transition-colors duration-200 px-3 py-2 rounded-full"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div className="relative group">
                    <a 
                      href={`#${item.id}`} 
                      className="text-white hover:bg-white hover:text-gray-900 font-medium transition-colors duration-200 px-3 py-2 rounded-full"
                    >
                      {item.name}
                    </a>
                    {/* <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    /> */}
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