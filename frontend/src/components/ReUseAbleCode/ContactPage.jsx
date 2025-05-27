import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import hiteshsir from "../../../public/Images/hiteshsir.png";
import piyushsir from "../../../public/Images/piyushsir.png";
import surajsir from "../../../public/Images/surajsir.png";

const socials = [
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-blue-700 text-2xl" />,
    url: "https://linkedin.com",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="text-sky-500 text-2xl" />,
    url: "https://twitter.com",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="text-zinc-800 dark:text-white text-2xl" />,
    url: "https://github.com",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-pink-600 text-2xl" />,
    url: "https://instagram.com",
  },
];

const ContactPage = () => {

  const contacts = [
    {
      id: 1,
      name: "Linkedin",
      username: "Vikram Kumar",
      color: "bg-[#0A66C2]",
      socialLikn: "https://www.linkedin.com/in/vikram-kumar-55bbab2aa/",
      svg: (
        <svg
          stroke="#0A66C2"
          fill="#0A66C2"
          strokeWidth="0"
          viewBox="0 0 384 512"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      name: "GitHub",
      username: "Vikram-Kumar12",
      color: "bg-[#000000]",
      socialLikn: "https://github.com/Vikram-Kumar12",
      svg: (
        <svg
          stroke="#000000"
          fill="#000000"
          stroke-width="0"
          viewBox="0 0 496 512"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      name: "X",
      username: "@VikramKumar0120",
      color: "bg-[#000000]",
      socialLikn: "https://x.com/vikramkumar095",
      svg: (
        <svg
          stroke="#000000"
          fill="#000000"
          stroke-width="0"
          viewBox="0 0 512 512"
          color="#00EEFF"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      name: "Instagram",
      username: "viku0956",
      color: "bg-[#FF3D25]",
      socialLikn: "https://www.instagram.com/viku0956/",
      svg: (
        <svg
          stroke="#FF3D25"
          fill="#FF3D25"
          stroke-width="0"
          viewBox="0 0 448 512"
          color="#00EEFF"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        </svg>
      ),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const teamMembers = [
    {
      src: hiteshsir,
      name: "Hitesh Choudhary",
      role: "Haan ji, toh kaise hain aap sabhi",
    },
    {
      src: piyushsir,
      name: "Piyush Garg",
      role: "Chaliye, aaj apna khud ka GitHub banate hain scratch se.",
    },
    {
      src: surajsir,
      name: "Suraj Jha",
      role: "Achha ruko, ruko guys — yeh dekho!",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] contact-section   w-full pb-20 pt-20 px-4 sm:px-6 lg:px-8">
      <div
        style={{ fontFamily: "font1" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16"
      >
        {/* Left Side - Thank You Section with Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 shadow-lg border border-white/20 bg-gradient-to-br from-orange-100  via-white to-[#ac6539] px-2 py-5 rounded-3xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Thank You{" "}
              <FaHeart className="inline text-red-500 animate-pulse" />
            </h2>
            <p className="text-lg text-amber-800 mb-6">
              For your incredible support and guidance throughout this project.
              Your help has been invaluable in bringing this vision to life.
            </p>
          </motion.div>

          {/* Image Grid - Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300`}
              >
                <div className="relative group">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {member.name}
                      </h3>
                      <p className="text-amber-200 text-sm">
                        {member.role}{" "}
                        <FaHeart className="inline text-red-500 animate-pulse" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-amber-600">
                    {member.role}{" "}
                    <FaHeart className="inline text-red-500 animate-pulse" />{" "}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>

        {/* Right Side - Connect Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className=" backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20  bg-gradient-to-br from-orange-100  via-white to-[#ac6539] overflow-hidden "
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Let's Connect
            </motion.h1>

            <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1   px-4 sm:px-6">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  className="rounded-2xl shadow-md px-2 py-5 hover:shadow-xl transition-all border-1 border-gray-200"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div
                    className={`text-black transition-colors duration-300  rounded-full `}
                  >
                    {contact.svg}
                  </div>
                  {/* <h3 className="text-lg font-semibold ml-2">{contact.name}</h3> */}
                  <p className="text-gray-500 mb-2 ml-1 mt-2 break-words w-fit  text-start">
                    {contact.username}
                  </p>
                  <a
                    style={{ fontFamily: "font2" }}
                    href={contact.socialLikn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-white text-center flex items-center justify-center w-fit ${contact.color} rounded-md transition ml-1`}
                  >
                    {contact.name}
                  </a>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactPage;
