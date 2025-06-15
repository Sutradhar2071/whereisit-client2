import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";

const LatestItemsSection = () => {
  useTitle("WhereIsIt | Latest Items");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:3000/items?sort=date_desc&limit=6", {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized - Please login again');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0, 6));
      } catch (error) {
        console.error('Error fetching latest items:', error);
        setError(error.message);
        
        if (error.message.includes('Unauthorized')) {
          Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Please login again to view latest items',
          }).then(() => {
            navigate('/login');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to load latest items',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestItems();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Lost & Found Items</h2>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">No items found</p>
          {user && (
            <button
              onClick={() => navigate("/add-item")}
              className="bg-violet-600 text-white py-2 px-6 rounded hover:bg-violet-700 transition"
            >
              Add New Item
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div 
                key={item._id} 
                className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col hover:transform hover:scale-105 duration-200"
              >
                <div className="w-full h-48 bg-gray-200 rounded overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        e.target.className = 'w-full h-full object-contain p-4';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                    item.postType === "Lost" 
                      ? "bg-red-100 text-red-800" 
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.postType}
                </span>

                <h3 className="text-xl font-semibold mt-2 line-clamp-1">{item.title}</h3>

                <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>

                <div className="mt-auto pt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Location:</span> {item.location}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/items/${item._id}`)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-full"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/lost-found-items")}
              className="bg-gray-800 text-white py-3 px-8 rounded-lg hover:bg-gray-900 transition flex items-center gap-2"
            >
              <span>See All Lost & Found Items</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default LatestItemsSection;