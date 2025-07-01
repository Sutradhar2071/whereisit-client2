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
  const [sortKey, setSortKey] = useState("title"); // title or location
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await user?.getIdToken();

        const response = await fetch(
          "https://whereisit-server-nine.vercel.app/allItems",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    let tempItems = allItems;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      tempItems = tempItems.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.location.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort by key
    tempItems = [...tempItems].sort((a, b) => {
      const aVal = a[sortKey]?.toLowerCase() || "";
      const bVal = b[sortKey]?.toLowerCase() || "";
      return aVal.localeCompare(bVal);
    });

    setFilteredItems(tempItems);
  }, [searchTerm, allItems, sortKey]);

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-5 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Sorry, you must be logged in to view this page.
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Please login so you can view all lost and found items and take necessary actions.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h1 className="text-3xl font-bold text-center text-violet-600 mb-6">
        All Lost & Found Items
      </h1>

      <div className="max-w-md mx-auto mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          <option value="title">Sort by Title</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No items found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow-md bg-white dark:bg-gray-800">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-violet-100 dark:bg-violet-900">
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Title
                </th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Location
                </th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-violet-50 dark:hover:bg-violet-700 cursor-pointer"
                >
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:text-gray-300">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:text-gray-300">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-semibold">
                    <span
                      className={`${
                        item.postType === "Lost" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {item.postType}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-right">
                    <Link to={`/items/${item._id}`}>
                      <button className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700 transition">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllItemsPage;
