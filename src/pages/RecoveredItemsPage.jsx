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
          `http://localhost:3000/recoveredItems?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
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
  }, [user, navigate]);

  if (loading) return <Loading />;

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
          {items.map((item) => (
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
              {items.map((item) => (
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
    </section>
  );
};

export default RecoveredItemsPage;
