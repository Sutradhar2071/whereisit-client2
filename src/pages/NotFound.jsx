import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("WhereIsIt | Page Not Found");
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-base-200 px-4">
      <h1 className="text-7xl font-bold text-error">404</h1>
      <p className="text-2xl mt-4 font-semibold text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-outline btn-primary mt-6 flex items-center gap-2">
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
