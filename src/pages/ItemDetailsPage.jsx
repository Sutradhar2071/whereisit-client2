import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const ItemDetailsPage = () => {
  useTitle("WhereIsIt | View details Page")
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch item details", err);
        if (err.message === 'Unauthorized') {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate('/login');
        }
        setLoading(false);
      });
  }, [id, navigate]);

  const handleRecoverClick = () => {
    if (!user) {
      Swal.fire("Login Required", "Please login to recover this item.", "warning");
      return;
    }
    if (item.status === "recovered") {
      Swal.fire("Already Recovered", "This item is already marked as recovered.", "info");
      return;
    }
    setModalOpen(true);
  };

  const handleSubmitRecovery = () => {
    if (!recoveredLocation.trim()) {
      Swal.fire("Validation Error", "Please enter the recovered location.", "error");
      return;
    }

    const recoveredData = {
      originalItemId: item._id,
      originalItem: {
        title: item.title,
        description: item.description,
        category: item.category,
        location: item.location,
        date: item.date,
      },
      recoveredBy: {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      recoveredLocation,
      recoveredDate,
      status: "recovered",
    };

    fetch("http://localhost:3000/recoveredItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recoveredData),
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        if (data.insertedId) {
          fetch(`http://localhost:3000/items/${item._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "recovered" }),
            credentials: 'include'
          })
            .then(() => {
              Swal.fire("Success", "Item marked as recovered!", "success");
              setModalOpen(false);
              setItem(prev => ({ ...prev, status: "recovered" }));
            })
            .catch(() => {
              Swal.fire("Error", "Failed to update item status.", "error");
            });
        } else {
          Swal.fire("Error", "Failed to recover item. Try again.", "error");
        }
      })
      .catch((error) => {
        if (error.message === 'Unauthorized') {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate('/login');
        } else {
          Swal.fire("Error", "Failed to recover item. Try again.", "error");
        }
      });
  };

  if (loading) return <Loading />;
  if (!item) return <p className="text-center py-10">Item not found.</p>;

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`font-semibold ${item.status === "recovered" ? "text-green-600" : "text-red-600"}`}>
          {item.status === "recovered" ? "Recovered" : item.postType}
        </span>
      </p>

      {item.status !== "recovered" && (
        <button
          onClick={handleRecoverClick}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
        </button>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-4">Recover Item</h3>
            <label className="block mb-2 font-semibold">Recovered Location:</label>
            <input
              type="text"
              value={recoveredLocation}
              onChange={e => setRecoveredLocation(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter recovered location"
              autoFocus
            />

            <label className="block mb-2 font-semibold">Recovered Date:</label>
            <DatePicker
              selected={recoveredDate}
              onChange={date => setRecoveredDate(date)}
              className="border p-2 rounded w-full mb-4"
              maxDate={new Date()}
            />

            <label className="block mb-2 font-semibold">Recovered By:</label>
            <div className="flex items-center gap-3 mb-4">
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
              <div>
                <p>{user.displayName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRecovery}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemDetailsPage;