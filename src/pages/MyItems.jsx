import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const MyItems = () => {
  useTitle("WhereIsIt | My Item Page")
  const { user } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/allItems`, {
        credentials: 'include'
      })
        .then(res => {
          if (res.status === 401) {
            throw new Error('Unauthorized');
          }
          return res.json();
        })
        .then(data => {
          const userItems = data.filter((item) => item.email === user.email);
          setMyItems(userItems);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          if (err.message === 'Unauthorized') {
            Swal.fire("Session Expired", "Please login again", "error");
            navigate('/login');
          }
          setLoading(false);
        });
    }
  }, [user, navigate]);

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

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/items/${id}`, {
          method: "DELETE",
          credentials: 'include'
        });

        if (res.status === 401) {
          throw new Error('Unauthorized');
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
        } else {
          Swal.fire("Not Found", "Item not found or already deleted", "info");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        if (error.message === 'Unauthorized') {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate('/login');
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Manage My Items
      </h2>

      {myItems.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't posted any item yet.
        </p>
      ) : (
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
              {myItems.map((item) => (
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
      )}
    </div>
  );
};

export default MyItems;