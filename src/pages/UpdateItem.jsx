import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const UpdateItem = () => {
  useTitle("WhereIsIt | Update Page");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getIdToken } = useContext(AuthContext); 

  const [itemData, setItemData] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchItem() {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const token = await getIdToken(); 
        const res = await fetch(`https://whereisit-server-nine.vercel.app/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        const data = await res.json();
        setItemData(data);
        if (data?.date) {
          setDate(new Date(data.date));
        }
      } catch (err) {
        console.error(err);
        if (err.message === "Unauthorized") {
          Swal.fire("Session Expired", "Please login again", "error");
          navigate("/login");
        } else {
          Swal.fire("Error", "Failed to fetch item data.", "error");
        }
      }
    }

    fetchItem();
  }, [id, navigate, user, getIdToken]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error", "You must be logged in", "error");
      navigate("/login");
      return;
    }

    const form = e.target;

    const updatedItem = {
      postType: form.postType.value,
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      date: date.toISOString().split("T")[0],
      contactName: user.displayName,
      email: user.email,
    };

    try {
      const token = await getIdToken(); 

      const res = await fetch(`https://whereisit-server-nine.vercel.app/updateItems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedItem),
      });

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      const result = await res.json();

      if (result.modifiedCount > 0) {
        Swal.fire("Updated!", "Item updated successfully!", "success");
        navigate("/my-items");
      } else {
        Swal.fire("Error", "Failed to update item.", "error");
      }
    } catch (error) {
      console.error(error);
      if (error.message === "Unauthorized") {
        Swal.fire("Session Expired", "Please login again", "error");
        navigate("/login");
      } else {
        Swal.fire("Error", "Failed to update item.", "error");
      }
    }
  };

  if (!itemData) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Update Lost or Found Item</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Post Type</label>
          <select
            name="postType"
            defaultValue={itemData.postType}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Thumbnail (Image URL)</label>
          <input
            type="text"
            name="thumbnail"
            defaultValue={itemData.thumbnail}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={itemData.title}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={itemData.description}
            className="w-full border p-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            defaultValue={itemData.category}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="Pets">Pets</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Clothes">Clothes</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={itemData.location}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Date Lost/Found</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Contact Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
