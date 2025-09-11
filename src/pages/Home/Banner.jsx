/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import banner from "../../assets/banner.svg";
import banner2 from "../../assets/banner2.svg";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Banner = () => {
  const { user } = useContext(AuthContext);

  // Define animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <div>
      {/* Header Section */}
      <div className="lg:flex items-center space-x-5 p-5">
        <motion.h1
          className="lg:text-8xl text-5xl bebas lg:mt-15 mt-10 lg:w-1/2 w-full"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Tourna / Where Teams Unite
          <br className="block lg:hidden" /> For Battles
        </motion.h1>

        <div className="lg:w-1/2 w-full">
          <motion.p
            className="liter lg:text-xl"
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            At Tourna, we believe tournaments are more than just
            competitions—they're where legends are born. Whether you're an
            organizer crafting epic battles or a competitor hungry for victory,
            we've got the perfect platform for you. From local showdowns to
            championship series, step into a world where every match writes
            history.
          </motion.p>

          {!user ? (
            <div>
              <motion.Link
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={buttonVariants}
                to={"/signup"}
                className="btn bg-black text-white mt-5 roboto w-24 h-12"
              >
                Signup
              </motion.Link>
            </div>
          ) : (
            <div>
              <motion.Link
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={buttonVariants}
                to={""}
                className="btn bg-white text-black border-black mt-5 roboto w-24 h-12"
              >
                Explore
              </motion.Link>
            </div>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col lg:flex-row items-center gap-5 p-5">
        <motion.img
          className="w-full lg:w-1/2 h-auto object-cover"
          src={banner}
          alt="banner image"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          className="w-full lg:w-1/2 h-auto object-cover"
          src={banner2}
          alt="second banner image"
          initial="hidden"
          animate="visible"
          variants={{
            ...imageVariants,
            visible: {
              ...imageVariants.visible,
              transition: { delay: 0.4, duration: 0.8 },
            },
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default Banner;
