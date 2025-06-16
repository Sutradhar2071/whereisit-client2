import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const AddItem = () => {
  useTitle("WhereIsIt | Add Lost & Found Item");
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const token = await user?.getIdToken();

    const newItem = {
      postType: form.postType.value,
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      date: date.toISOString().split("T")[0],
      contactName: user?.displayName || "N/A",
      email: user?.email || "N/A",
    };

    try {
      const res = await fetch("http://localhost:3000/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token দিয়ে Authorization header যোগ করা হলো
        },
        body: JSON.stringify(newItem),
        credentials: 'include', // যদি cookie-based auth দরকার হয়
      });

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item added successfully!",
          confirmButtonColor: "#3085d6",
        });
        form.reset();
        setDate(new Date());
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add item.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(error);
      if (error.message === "Unauthorized") {
        Swal.fire("Session Expired", "Please login again", "error");
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add item.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Add Lost or Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Post Type</label>
          <select name="postType" className="w-full border p-2 rounded" required>
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
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
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
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddItem;
