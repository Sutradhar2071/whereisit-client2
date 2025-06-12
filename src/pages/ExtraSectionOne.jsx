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
      className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100
                 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                 p-10 rounded-2xl my-10 shadow-lg
                 transition-colors duration-500 ease-in-out"
      role="region"
      aria-label="Why use WhereIsIt section"
    >
      <h2 className="text-3xl font-extrabold text-violet-700 dark:text-white mb-4 animate-fade-in-up">
        Why Use{" "}
        <AnimatedText text="WhereIsIt?" />
      </h2>
      <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
        Whether you've lost something valuable or found something someone might be missing —{" "}
        <span className="font-semibold text-violet-600 dark:text-violet-400">
          WhereIsIt
        </span>{" "}
        makes it fast, secure, and community-powered to get it back. Join our trustworthy platform
        where every item counts!
      </p>
    </section>
  );
};

export default ExtraSectionOne;
