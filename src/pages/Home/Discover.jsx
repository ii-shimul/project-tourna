/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import image from "../../assets/bottom.svg";
import imageTwo from "../../assets/bottom2.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Discover = () => {
  // Set up intersection observer to trigger animations when component is in view
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageControls = useAnimation();
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (imageInView) {
      imageControls.start("visible");
    }
  }, [controls, inView, imageControls, imageInView]);

  // Animation variants
  const titleVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const statsVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.4 },
    },
  };

  const numberVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.6,
      },
    },
  };

  const imageSlideVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.8 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div>
      <motion.div
        className="lg:flex justify-between lg:mt-20 lg:p-0 p-5"
        ref={ref}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          className="bebas lg:w-1/2 lg:text-7xl text-4xl"
          variants={titleVariant}
        >
          Discover Our Impact on Games Culture
        </motion.h1>
        <div className="">
          <motion.p
            className="liter font-semibold text-lg"
            variants={contentVariant}
          >
            Our museum proudly showcases over 300 unique exhibits, attracting
            thousands of visitors each year. Join us in celebrating the vibrant
            world of sports through our diverse events and programs.
          </motion.p>
          <motion.div
            className="flex justify-between mt-5"
            variants={statsVariant}
          >
            <motion.div
              className=""
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h1 className="bebas text-6xl" variants={numberVariant}>
                300+
              </motion.h1>
              <p className="roboto font-semibold">
                Exhibits showcasing sneaker history and artistry.
              </p>
            </motion.div>
            <motion.div
              className=""
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h1 className="bebas text-6xl" variants={numberVariant}>
                50k
              </motion.h1>
              <p className="roboto font-semibold">
                Visitors exploring sport culture annually.
              </p>
            </motion.div>
          </motion.div>
          <motion.button
            className="btn bg-white text-black border-black mt-5 roboto h-12"
            variants={buttonVariant}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        className="lg:mt-20 lg:mb-20 lg:p-0 p-5"
        ref={imageRef}
        initial="hidden"
        animate={imageControls}
        variants={imageSlideVariant}
      >
        <figure className="diff aspect-16/6" tabIndex={0}>
          <div className="diff-item-1" role="img">
            <img alt="daisy" src={imageTwo} />
          </div>
          <div className="diff-item-2" role="img" tabIndex={0}>
            <img alt="daisy" src={image} />
          </div>
          <div className="diff-resizer"></div>
        </figure>
      </motion.div>
    </div>
  );
};

export default Discover;
