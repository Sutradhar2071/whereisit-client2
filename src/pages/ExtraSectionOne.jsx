import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import "../index.css";

const colors = ["#db2777", "#8b5cf6", "#6366f1"];

const AnimatedText = ({ text }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      color: colors,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.span animate={controls} style={{ display: "inline-block" }}>
      {text}
    </motion.span>
  );
};

const ExtraSectionOne = () => {
  return (
    <section
      className="bg-violet-50 dark:bg-gray-800 
                 p-10 rounded-3xl my-12 shadow-xl
                 border border-gray-200 dark:border-gray-700
                 transition-colors duration-500 ease-in-out"
      role="region"
      aria-label="Why use WhereIsIt section"
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-violet-700 dark:text-white mb-6">
        Why Use <AnimatedText text="WhereIsIt?" />
      </h2>

      {/* Divider */}
      <div className="w-24 h-1 bg-violet-500 mx-auto mb-8 rounded-full"></div>

      {/* Content */}
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide text-center">
        Whether you've lost something valuable or found something someone might
        be missing —{" "}
        <span className="font-semibold text-violet-600 dark:text-violet-400">
          WhereIsIt
        </span>{" "}
        makes it <span className="font-semibold">fast</span>,{" "}
        <span className="font-semibold">secure</span>, and{" "}
        <span className="font-semibold">community-powered</span> to get it back.
        Join our trustworthy platform where every item counts!
      </p>

      {/* Call to Action */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://ringku-sd-codesign.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-md transition-transform transform hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default ExtraSectionOne;
