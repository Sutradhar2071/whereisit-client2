import React from "react";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "Thank you for subscribing to our newsletter.",
      confirmButtonColor: "#7C3AED",
    });

    e.target.reset();
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg dark:bg-gray-900 py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-700 dark:text-violet-300 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Get the latest updates, tips, and lost & found stories delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-5 py-3 rounded-full shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-semibold shadow-md transition"
          >
            Subscribe
          </button>
        </form>

        <small className="mt-4 block text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. No spam ever.
        </small>
      </div>
    </section>
  );
};

export default NewsletterSection;
