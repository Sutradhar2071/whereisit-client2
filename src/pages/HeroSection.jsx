import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="bg-[#1A202C] text-white min-h-[500px] flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side (animated image) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://i.ibb.co/M52LVrsg/istockphoto-1206796363-612x612.jpg"
            alt="Lost and Found Illustration"
            className="w-full rounded-2xl max-w-md mx-auto shadow-lg"
            animate={{ x: [0, 20, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Right side (text + buttons) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
            Lost Something? <br />
            <span className="text-yellow-300">Find it with WhereIsIt!</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            To quickly find your lost or found items, post and search easily. Our platform will help you get your belongings back.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 mb-6 text-yellow-400 text-2xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold transition duration-300">
              Post a new item
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-full font-semibold transition duration-300">
              Start the search
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
