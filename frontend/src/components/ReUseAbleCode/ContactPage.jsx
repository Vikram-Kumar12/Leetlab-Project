import { motion } from "framer-motion";

const ContactPage = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vikram-kumar-55bbab2aa/",
    },
    {
      name: "GitHub",
      url: "https://github.com/Vikram-Kumar12",
    },
    {
      name: "Twitter",
      url: "https://x.com/vikramkumar095",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/viku0956/",
    },
  ];

  return (
    <div
      style={{ fontFamily: "font1" }}
      className="px-4 sm:px-6 lg:px-8 bg-[#2E2E2E] overflow-hidden"
    >

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="text-center mb-10">
          <motion.h1
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's Connect
          </motion.h1>
        </div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              className=""
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span
                  style={{ fontFamily: "font1" }}
                  className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-400 hover:after:w-full after:transition-all bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-medium mb-1 text-5xl "
                >
                  {link.name}
                </span>
                <motion.div
                  className="h-0.5 bg-gray-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          
          style={{ fontFamily: "font1" }}
          className="text-center py-5 text-2xl"
        >
          <motion.h1 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer text-zinc-400"
          >© LeetLab 2025</motion.h1>
        </motion.div>

      </motion.div>

    </div>
  );
};

export default ContactPage;
