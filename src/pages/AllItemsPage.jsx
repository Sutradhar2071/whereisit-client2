import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allItems") // 🔁 তোমার সার্ভার লিংক
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-6">
        All Lost & Found Items
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-100 rounded-lg shadow-md p-5 space-y-2"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p><span className="font-semibold">Category:</span> {item.category}</p>
            <p><span className="font-semibold">Location:</span> {item.location}</p>
            <p><span className="font-semibold">Status:</span> {item.postType}</p>

            <Link to={`/item/${item._id}`}>
              <button className="mt-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
