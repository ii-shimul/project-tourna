import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="bg-base-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="text-black">Tourna</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl opacity-80 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The ultimate platform for organizing and managing tournaments with
              ease
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="badge badge-outline badge-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Single Elimination
              </motion.div>
              <motion.div
                className="badge badge-outline badge-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Team Management
              </motion.div>
              <motion.div
                className="badge badge-outline badge-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Real-time Updates
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg opacity-80 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We believe that organizing tournaments should be simple, efficient,
            and enjoyable. Tourna was created to eliminate the complexity of
            tournament management, allowing organizers to focus on what matters
            most - creating memorable competitive experiences for participants
            and spectators alike.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  🏆
                </motion.div>
                <h3 className="card-title justify-center">
                  Single Elimination
                </h3>
                <p className="opacity-70">
                  Classic tournament format with automatic bracket generation
                  and progression tracking.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  👥
                </motion.div>
                <h3 className="card-title justify-center">Team Management</h3>
                <p className="opacity-70">
                  Create and manage teams with member details, captains, and
                  comprehensive team information.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  ⚡
                </motion.div>
                <h3 className="card-title justify-center">Real-time Updates</h3>
                <p className="opacity-70">
                  Live bracket updates as matches progress, keeping everyone
                  informed of the current standings.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  📊
                </motion.div>
                <h3 className="card-title justify-center">
                  Tournament Analytics
                </h3>
                <p className="opacity-70">
                  Track tournament progress, match statistics, and team
                  performance metrics.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <div className="card-title justify-center">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    🎯
                  </motion.div>
                  <h3>Easy Management</h3>
                </div>
                <p className="opacity-70">
                  Intuitive interface for tournament organizers to set up and
                  manage events effortlessly.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="card-body text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  📱
                </motion.div>
                <h3 className="card-title justify-center">Responsive Design</h3>
                <p className="opacity-70">
                  Access and manage tournaments from any device with our
                  mobile-friendly interface.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              1
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Create Teams</h3>
            <p className="opacity-70">
              Set up your teams with member details and captain information.
              Organize your participants efficiently.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              2
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Setup Tournament</h3>
            <p className="opacity-70">
              Create your tournament, select participating teams, and choose
              your preferred format.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              3
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">Manage Matches</h3>
            <p className="opacity-70">
              Track match results, advance winners, and watch your tournament
              unfold in real-time.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="card bg-base-100 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="card-body">
                <motion.div
                  className="avatar placeholder mb-4 mx-auto"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-black text-white place-content-center rounded-full w-24">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Development Team</h3>
                <p className="opacity-70 mb-4">
                  Passionate developers dedicated to creating the best
                  tournament management experience.
                </p>
                <motion.div
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="badge badge-outline"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    React
                  </motion.div>
                  <motion.div
                    className="badge badge-outline"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Node.js
                  </motion.div>
                  <motion.div
                    className="badge badge-outline"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    MySQL
                  </motion.div>
                  <motion.div
                    className="badge badge-outline"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Tailwind CSS
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="card bg-base-100 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    📧
                  </motion.div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="opacity-70">support@tourna.com</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-3xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    💬
                  </motion.div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="opacity-70">24/7 Help Center</p>
                </motion.div>
              </div>
              <div className="divider"></div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <p className="opacity-70 mb-4">
                  Have questions or feedback? We'd love to hear from you!
                </p>
                <motion.button
                  className="btn bg-black text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Support
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        className="bg-black text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Tournament?
          </motion.h2>
          <motion.p
            className="text-lg opacity-90 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of organizers who trust Tourna for their tournament
            management needs.
          </motion.p>
          <motion.button
            className="btn bg-white text-black btn-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
