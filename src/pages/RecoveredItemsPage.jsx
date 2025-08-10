import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaThLarge, FaTable } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Swal from "sweetalert2";

const RecoveredItemsPage = () => {
  useTitle("WhereIsIt | Recovered Items Page");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, getIdToken } = useContext(AuthContext);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    async function fetchRecoveredItems() {
      setLoading(true);
      try {
        const token = await getIdToken();

        const res = await fetch(
          `https://whereisit-server-nine.vercel.app/recoveredItems?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch recovered items", err);
        if (err.message === "Unauthorized") {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate("/login");
        } else {
          Swal.fire("Error", "Could not fetch recovered items.", "error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecoveredItems();
  }, [user, navigate, getIdToken]);

  if (loading) return <Loading />;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if(pageNumber < 1) pageNumber = 1;
    else if(pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center flex-grow">
          My Recovered Items
        </h2>

        <div className="flex gap-4 ml-4">
          <button
            onClick={() => setIsGridLayout(true)}
            aria-label="Grid View"
            title="Grid View"
            className={`p-3 rounded-full cursor-pointer transition-shadow ${
              isGridLayout
                ? "bg-blue-600 shadow-lg text-white"
                : "bg-gray-200 text-gray-600 hover:shadow-md hover:bg-gray-300"
            }`}
          >
            <FaThLarge size={28} />
          </button>

          <button
            onClick={() => setIsGridLayout(false)}
            aria-label="Table View"
            title="Table View"
            className={`p-3 rounded-full cursor-pointer transition-shadow ${
              !isGridLayout
                ? "bg-blue-600 shadow-lg text-white"
                : "bg-gray-200 text-gray-600 hover:shadow-md hover:bg-gray-300"
            }`}
          >
            <FaTable size={28} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't recovered any items yet.
        </p>
      ) : isGridLayout ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.originalItem?.title}
              </h3>
              <p>
                <strong>Recovered Location:</strong> {item.recoveredLocation}
              </p>
              <p>
                <strong>Recovered Date:</strong>{" "}
                {new Date(item.recoveredDate).toLocaleDateString()}
              </p>
              <p className="text-green-600 font-medium flex items-center gap-1 mt-2">
                <FaCheckCircle /> Recovered
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Recovered Location</th>
                <th className="px-4 py-2">Recovered Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.originalItem?.title}</td>
                  <td className="px-4 py-2">{item.recoveredLocation}</td>
                  <td className="px-4 py-2">
                    {new Date(item.recoveredDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-green-600 font-medium flex items-center gap-1">
                    <FaCheckCircle /> Recovered
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {items.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => paginate(pageNum)}
                className={`px-4 py-2 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default RecoveredItemsPage;
