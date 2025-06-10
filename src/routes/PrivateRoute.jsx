import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation(); // বর্তমান লোকেশন পাওয়া যাচ্ছে

  if (loading) return <Loading></Loading>;

  if (!user) {
    // ইউজার না থাকলে login page-এ পাঠিয়ে দাও এবং state-এ আগের লোকেশন পাঠাও
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
