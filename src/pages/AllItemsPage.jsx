import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Swal from "sweetalert2";

const AllItemsPage = () => {
  useTitle("WhereIsIt | All Items");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await user?.getIdToken(); 

        const response = await fetch("https://whereisit-server-nine.vercel.app/allItems", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setAllItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        if (error.message === "Unauthorized") {
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please login again to view items",
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load items",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchItems();
    } else {
      setLoading(false);
    }
  }, [navigate, user]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(allItems);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.location.toLowerCase().includes(lowerTerm)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, allItems]);

  if (loading) return <Loading />;

  if (!loading && filteredItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-5">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          {searchTerm ? "No items match your search" : "No items found"}
        </h2>
        {user && (
          <button
            onClick={() => navigate("/add-item")}
            className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
          >
            Add new item
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-6">
        All Lost & Found Items
      </h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 space-y-2 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold dark:text-white">
              {item.title}
            </h2>
            <p className="dark:text-gray-300">
              <span className="font-semibold">Category:</span> {item.category}
            </p>
            <p className="dark:text-gray-300">
              <span className="font-semibold">Location:</span> {item.location}
            </p>
            <p className="dark:text-gray-300">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  item.postType === "Lost" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.postType}
              </span>
            </p>
            <Link to={`/items/${item._id}`}>
              <button className="mt-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItemsPage;
