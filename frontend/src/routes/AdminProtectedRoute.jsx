import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../context/authContext";

import Forbidden from "../Pages/Errors/Forbidden.jsx";

const AdminProtectedRoute = () => {
  const { authLoading, isAuthenticated, isAdmin } = useAuthStore();

  const location = useLocation();

  // Wait until authentication check completes
  if (authLoading) {
    return null;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // Logged in but not an admin
  if (!isAdmin) {
    return <Forbidden />;
  }

  // Authorized admin
  return <Outlet />;
};

export default AdminProtectedRoute;
