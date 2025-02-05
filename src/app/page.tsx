"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import DynamicChart from "./DynamicChart"; // Adjust the path as needed

export default function HighEndDataSciencePortfolio() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-6 bg-zinc-900 shadow-md border-b border-zinc-700">
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-widest"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Data Science Portfolio
        </motion.h1>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="#about" className="hover:text-blue-400 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-blue-400 transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-blue-400 transition-colors">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-900 to-black py-20 px-4">
        <motion.div
          className="max-w-3xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Empower Your Business Through Data
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Transform raw data into actionable insights. Specializing in advanced
            analytics, machine learning, and data visualization to help you make
            data-driven decisions.
          </p>
          <Button className="px-8 py-4 text-lg" variant="default">
            Get Started
          </Button>
        </motion.div>
        {/* Overlay Shape */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 pointer-events-none" />
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-zinc-900 border-t border-zinc-700">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            className="text-4xl font-bold mb-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            About the Data Scientist
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-zinc-800 rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-3">Background & Education</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>BSc in Computer Science, XYZ University</li>
                <li>MSc in Data Science, ABC Institute</li>
                <li>Certified Data Analyst, Major Tech Organization</li>
                <li>5+ Years Industry Experience</li>
              </ul>
            </div>
            <div className="bg-zinc-800 rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-3">Other Details & Achievements</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Recipient of the Best Machine Learning Project Award (2022)</li>
                <li>Author of "Data-Driven Decisions" blog series</li>
                <li>Speaker at multiple data science conferences</li>
                <li>Open-source contributor to ML libraries</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-black border-t border-zinc-700">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-bold mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="p-6 bg-zinc-800 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold mb-2">Data Analysis</h4>
              <p className="text-gray-300">
                In-depth statistical analysis of your business data to uncover
                patterns and trends.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-zinc-800 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold mb-2">Machine Learning</h4>
              <p className="text-gray-300">
                Build and deploy predictive models that help forecast sales,
                detect anomalies, and more.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-zinc-800 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold mb-2">Data Visualization</h4>
              <p className="text-gray-300">
                Interactive dashboards and reports for clear insights and
                easy-to-understand metrics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-4 bg-zinc-900 border-t border-zinc-700">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-bold mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Selected Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md bg-zinc-800 text-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">
                    Sales Forecasting
                  </h4>
                  <p className="text-gray-300">
                    Developed a machine learning model to accurately predict
                    quarterly sales, reducing forecasting errors by 30%.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md bg-zinc-800 text-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">
                    Customer Segmentation
                  </h4>
                  <p className="text-gray-300">
                    Implemented clustering techniques to identify key customer
                    groups, leading to improved targeted marketing strategies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md bg-zinc-800 text-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">
                    Real-time Analytics
                  </h4>
                  <p className="text-gray-300">
                    Built streaming data pipelines for real-time dashboards
                    offering up-to-the-minute insights.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Section with Dynamic Chart */}
     {/* <section id="analytics" className="py-16 px-4 bg-black border-t border-zinc-700">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-bold mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Analytics
          </motion.h3>
          <DynamicChart />
        </div>
      </section>
      */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-black border-t border-zinc-700">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-bold mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h3>
          <motion.form
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              // Add your form submission logic here
              alert("Thanks for your message!");
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="p-3 rounded-2xl border border-zinc-700 bg-zinc-800 focus:outline-none focus:border-blue-500 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-3 rounded-2xl border border-zinc-700 bg-zinc-800 focus:outline-none focus:border-blue-500 text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="p-3 rounded-2xl border border-zinc-700 bg-zinc-800 focus:outline-none focus:border-blue-500 text-white"
            />
            <Button
              type="submit"
              variant="default"
              className="mt-4 justify-self-center px-6 py-3 text-lg"
            >
              Send Message
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-zinc-900 border-t border-zinc-700">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
