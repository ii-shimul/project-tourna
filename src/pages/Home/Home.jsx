/* eslint-disable no-unused-vars */
import Banner from "./Banner";
import Join from "./Join";
import Discover from "./Discover";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Banner />
      <Join />
      <Discover />
    </motion.div>
  );
};

export default Home;
