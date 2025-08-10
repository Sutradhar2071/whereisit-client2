import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Swal from "sweetalert2";
import { FaTable, FaThLarge } from "react-icons/fa";

const AllItemsPage = () => {
  useTitle("WhereIsIt | All Items");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("title"); // title or location
  const [viewType, setViewType] = useState("table"); // table or card
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

    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      tempItems = tempItems.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.location.toLowerCase().includes(lowerTerm)
      );
    }

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
        <h2 className="text-2xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
          Sorry, you must be logged in to view this page.
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-violet-600">
          All Lost & Found Items
        </h1>
        {/* Toggle View Button */}
        <button
          onClick={() => setViewType(viewType === "table" ? "card" : "table")}
          className="p-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          title={`Switch to ${viewType === "table" ? "Card" : "Table"} View`}
        >
          {viewType === "table" ? <FaThLarge size={20} /> : <FaTable size={20} />}
        </button>
      </div>

      <div className="max-w-md mx-auto mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:bg-gray-800 dark:text-gray-200"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="title">Sort by Title</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No items found.</p>
      ) : viewType === "table" ? (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded shadow-md bg-white dark:bg-gray-800">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-violet-100 dark:bg-violet-900">
                <th className="px-6 py-3 border-b text-left text-gray-600 dark:text-gray-300">Title</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 dark:text-gray-300">Location</th>
                <th className="px-6 py-3 border-b text-left text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-violet-50 dark:hover:bg-violet-700">
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.category}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.location}</td>
                  <td className="px-6 py-4 font-semibold">
                    <span className={item.postType === "Lost" ? "text-red-500" : "text-green-500"}>
                      {item.postType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/items/${item._id}`}>
                      <button className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARD VIEW */
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-violet-600">{item.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">Category: {item.category}</p>
                <p className="text-gray-500 dark:text-gray-400">Location: {item.location}</p>
                <p className="font-semibold mt-2">
                  Status:{" "}
                  <span className={item.postType === "Lost" ? "text-red-500" : "text-green-500"}>
                    {item.postType}
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <Link to={`/items/${item._id}`}>
                  <button className="w-full px-3 py-2 bg-violet-600 text-white rounded hover:bg-violet-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllItemsPage;
