/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import image from "../../assets/Team lineup-pana.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Join = () => {
  // Set up intersection observer to trigger animations when component is in view
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.6, duration: 0.4 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="lg:flex items-center justify-between p-5 lg:p-0 lg:mt-0 mt-15"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div variants={containerVariants}>
        <motion.h1 className="bebas text-7xl" variants={itemVariants}>
          Join the Sports Revolution
        </motion.h1>
        <motion.p
          className="liter font-semibold text-xl"
          variants={itemVariants}
        >
          Dive deeper into sports culture and secure your tickets or memberships
          today!
        </motion.p>
        <motion.button
          className="btn bg-white text-black border-black mt-5 roboto h-12"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </motion.div>
      <motion.img
        className="lg:w-1/2 lg:mt-0 mt-5 lg:h-[600px]"
        src={image}
        alt="Team lineup"
        variants={imageVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Join;
