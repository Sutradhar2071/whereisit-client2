import { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const RecoveredItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/recoveredItems?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recovered items", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Recovered Items</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t recovered any items yet.</p>
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
              {items.map(item => (
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
