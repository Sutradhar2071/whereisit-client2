import { motion } from "framer-motion";

const ExtraSectionTwo = () => {
  const linkedinUrl = "https://www.linkedin.com/in/ringku-sutradhar-8461002aa/";

  return (
    <section
      className="bg-gradient-to-r from-green-50 via-green-100 to-green-200
                 dark:from-green-900 dark:via-green-800 dark:to-green-900
                 p-12 rounded-3xl shadow-xl max-w-3xl mx-auto my-16
                 text-center transition-colors duration-700 ease-in-out
                 hover:from-green-100 hover:via-green-200 hover:to-green-300
                 dark:hover:from-green-800 dark:hover:via-green-700 dark:hover:to-green-800"
      role="region"
      aria-label="Join Our Community section"
    >
      <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-200 mb-6 tracking-tight">
        Join Our <span className="text-green-600 dark:text-green-400">Community</span>
      </h2>
      <p className="text-xl text-green-700 dark:text-green-300 max-w-lg mx-auto leading-relaxed tracking-wide">
        Over <span className="font-semibold text-green-900 dark:text-green-100">10,000+</span> users have successfully found their lost items through{" "}
        <span className="text-green-900 dark:text-green-100 font-bold">WhereIsIt</span>. Become part of a trustworthy and active community today!
      </p>
      <motion.button
        onClick={() => window.open(linkedinUrl, "_blank")}
        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg
                   hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300
                   dark:focus:ring-green-700 transition-all duration-300"
        aria-label="Join WhereIsIt Community"
      >
        Join Now
      </motion.button>
    </section>
  );
};

export default ExtraSectionTwo;
