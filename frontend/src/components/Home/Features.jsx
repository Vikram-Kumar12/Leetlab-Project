import { motion } from "framer-motion";
import images4 from "../../../public/Images/images4.png";
import facebook from "../../../public/Images/CompanyImages/facebook.svg";
import amazon from "../../../public/Images/CompanyImages/amazon.svg";
import apple from "../../../public/Images/CompanyImages/apple.svg";
import bankofamerica from "../../../public/Images/CompanyImages/bank-of-america.svg";
import cisco from "../../../public/Images/CompanyImages/cisco.svg";
import intel from "../../../public/Images/CompanyImages/intel.svg";
import jet from "../../../public/Images/CompanyImages/jet.svg";
import leapmotion from "../../../public/Images/CompanyImages/leap-motion.svg";
import pinterest from "../../../public/Images/CompanyImages/pinterest.svg";
import stripe from "../../../public/Images/CompanyImages/stripe.svg";
import Button from "../ReUseAbleCode/Button";

const Features = () => {
  const companyLogos = [
    { src: facebook, alt: "facebook" },
    { src: amazon, alt: "amazon" },
    { src: apple, alt: "apple" },
    { src: bankofamerica, alt: "bankofamerica" },
    { src: cisco, alt: "cisco" },
    { src: intel, alt: "intel" },
    { src: jet, alt: "jet" },
    { src: leapmotion, alt: "leapmotion" },
    { src: pinterest, alt: "pinterest" },
    { src: stripe, alt: "stripe" },
  ];

  return (
    <div className="bg-[#2E2E2E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Image */}
        <motion.div
         
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex items-center justify-center"
        >
          <motion.img
           whileHover={{ scale: 1.05 }}
            src={images4}
            alt="Feature showcase"
            className="w-[10rem] h-[10rem]  object-cover "
          />
        </motion.div>

        {/* heading */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl text-[#C62828] font-bold mb-5 text-center max-w-3xl mx-auto"
        >
          Made with <span className="text-[#C62828]">❤</span> in SF
        </motion.h1>

        {/* Content Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-25"
        >
          At LeetLab, our mission is to help you improve yourself and land your
          dream job. We have a sizable repository of interview resources for
          many companies. In the past few years, our users have landed jobs at
          top companies around the world.
        </motion.p>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 items-center justify-items-center">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="opacity-30 hover:opacity-50 transition-opacity"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="border-t border-gray-700 my-12"
        />

        {/* Join Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-lg font-bold text-gray-300 mb-4 text-center">
            If you are passionate about tackling some of the most interesting
            problems around, we would love to hear from you.
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center mb-20"
          >
            <Button children="Join Our Team" />

            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: "font2" }}
              className="block lg:hidden px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold rounded-lg text-xl shadow-lg"
            >
              Join Our Team
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
