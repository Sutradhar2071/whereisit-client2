import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const MyItems = () => {
  useTitle("WhereIsIt | My Item Page");
  const { user, getIdToken } = useContext(AuthContext); 
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const token = await getIdToken();
        const res = await fetch("https://whereisit-server-nine.vercel.app/allItems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        const userItems = data.filter((item) => item.email === user.email);
        setMyItems(userItems);
      } catch (error) {
        console.error(error);
        if (error.message === "Unauthorized") {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate("/login");
        } else {
          Swal.fire("Error", "Failed to fetch your items", "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user, navigate, getIdToken]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = await getIdToken();

      const res = await fetch(`https://whereisit-server-nine.vercel.app/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error:", errorText);
        Swal.fire("Error", "Failed to delete the item", "error");
        return;
      }

      const result = await res.json();

      if (result.deletedCount > 0) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        setMyItems(myItems.filter((item) => item._id !== id));
        // Reset current page if after delete no items on the current page
        const totalAfterDelete = myItems.length - 1;
        const totalPagesAfterDelete = Math.ceil(totalAfterDelete / itemsPerPage);
        if(currentPage > totalPagesAfterDelete) setCurrentPage(totalPagesAfterDelete);
      } else {
        Swal.fire("Not Found", "Item not found or already deleted", "info");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      if (error.message === "Unauthorized") {
        Swal.fire("Session Expired", "Please login again", "error");
        navigate("/login");
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  if (loading) return <Loading />;

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(myItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if(pageNumber < 1) pageNumber = 1;
    else if(pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage My Items</h2>

      {myItems.length === 0 ? (
        <div className="text-center text-gray-600 space-y-4">
          <p>You haven't posted any item yet.</p>
          <Link to="/add-item">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add Item
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Post Type</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id} className="text-center border-t">
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.category}</td>
                    <td className="py-2 px-4">{item.postType}</td>
                    <td className="py-2 px-4 space-x-2">
                      <Link to={`/updateItem/${item._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {myItems.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-6 space-x-3">
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
        </>
      )}
    </div>
  );
};

export default MyItems;
