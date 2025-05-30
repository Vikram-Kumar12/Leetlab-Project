import { motion } from "framer-motion";
import { useState } from "react";
import RightSidePage from "./RightSidePage";
import { useAuthStore } from "../../store/useAuthStore";

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const {authUser} = useAuthStore();
  // console.log("Auth details1 :",authUser);
  // console.log("Auth details2 :",authUser?.firstname);
  
  const handleEditClick = () => {
    alert("This feature is not completed yet!");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden lg:px-20 px-5 py-5 max-w-7xl mx-auto">

      {/* Sidebar - 1.5 parts out of 4 */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className=" w-full h-fit lg:w-3/8  bg-slate-900  flex flex-col md:px-10 lg:py-5 py-3 text-white relative overflow-hidden rounded-lg mr-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 rounded-full bg-purple-600 opacity-20"
              animate={{
                x: [0, 20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-indigo-600 opacity-20"
              animate={{
                x: [0, -15, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </>
        )}

        {/* Profile Image */}
        <motion.div
          className="w-60 h-70 md: lg:w-60 lg:h-70   bg-slate-600 rounded-md mb-6 overflow-hidden shadow-xl mx-auto md:mx-0 2xl:mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <img
            // src={authUser?.inage}
            src="https://images.unsplash.com/photo-1610088441520-4352457e7095?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* first and last name */}
        <motion.div
          style={{ fontFamily: "font4" }}
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-lg md:text-2xl font-bold break-words bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 text-center md:text-start">
            {authUser?.firstname} {authUser?.lastname}
          </h1>
        </motion.div>

        {/* username */}
        <motion.div
          style={{ fontFamily: "font1" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-300 text-center md:text-start mb-2">
            {authUser?.username}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="text-center md:text-start mb-3 text-sm md:text-base text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Full-stack developer | React enthusiast | Coffee lover | Building
            cool stuff on the web
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          className="text-center md:text-start mb-6 text-indigo-300 text-xs md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>{authUser?.email}</p>
        </motion.div>

        {/* Edit Button */}
        <motion.button
          style={{ fontFamily: "font4" }}
          onClick={handleEditClick}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white font-medium shadow-lg transition-all duration-300 w-fit  mx-auto md:w-full mb-10 lg:mb-5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Edit Profile
        </motion.button>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
      </motion.div>

      {/* Main Content - 2.5 parts out of 4 */}
      <div className="w-full lg:w-2.5/4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className=""
        >
          <RightSidePage/>
        </motion.div>
      </div>
      
    </div>
  );
};

export default SideNavbar;
