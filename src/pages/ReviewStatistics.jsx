import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewStatistics = ({
  averageRating = 4.5,
  totalReviews = 1234,
  ratingsDistribution,
}) => {
  ratingsDistribution = {
    5: 800,
    4: 250,
    3: 100,
    2: 50,
    1: 34
  }

  // Calculate total count if not provided
  const totalCount =
    totalReviews ||
    Object.values(ratingsDistribution || {}).reduce((a, b) => a + b, 0);

  // Helper to render stars based on averageRating
  const renderStars = () => {
    const stars = [];
    let rating = averageRating;
    for (let i = 1; i <= 5; i++) {
      if (rating >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
      rating -= 1;
    }
    return stars;
  };

  // Normalize distribution percentages for bar widths
  const maxCount = Math.max(...Object.values(ratingsDistribution || {}), 1);

  return (
    <section className="max-w-md mx-auto mt-15 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        User Reviews
      </h2>

      {/* Average rating and stars */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-5xl font-bold text-yellow-400">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex space-x-1 mt-1">{renderStars()}</div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {totalCount} Reviews
        </p>
      </div>

      {/* Ratings distribution */}
      <div>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingsDistribution?.[star] || 0;
          const widthPercent = (count / maxCount) * 100;

          return (
            <div key={star} className="flex items-center mb-2 space-x-2">
              <span className="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                {star} <FaStar className="inline text-yellow-400" />
              </span>
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-4 bg-yellow-400"
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
              <span className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewStatistics;
