import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestItemsSection = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/items?sort=date_desc&limit=6")
      .then(res => res.json())
      .then(data => {
        
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0, 6));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Lost & Found Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item._id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            {/* Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover rounded"
              loading="lazy"
            />

            {/* Post Type Badge */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded ${
                item.postType === "Lost" ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {item.postType}
            </span>

            {/* Title */}
            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

            {/* Short Description */}
            <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>

            {/* Date & Location */}
            <p className="mt-auto text-sm text-gray-500">
              {new Date(item.date).toLocaleDateString()} | {item.location}
            </p>

            {/* View Details Button */}
            <button
              onClick={() => navigate(`/items/${item._id}`)}
              className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/lost-found-items")}
          className="bg-gray-800 text-white py-3 px-8 rounded hover:bg-gray-900 transition"
        >
          See All Lost & Found Items
        </button>
      </div>
    </section>
  );
};

export default LatestItemsSection;
