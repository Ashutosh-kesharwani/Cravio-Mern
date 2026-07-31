import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../context/authContext.js";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useAuthStore();

  const location = useLocation();

  // Wait until the authentication check is completed.
  // This prevents unwanted redirects while the user session
  // is still being restored from the server.
  if (authLoading) {
    return null;
  }

  // User is not authenticated.
  // Redirect to the Home page and preserve the current location
  // so the user can be redirected back after a successful login.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // User is authenticated.
  // Render the requested protected route.
  return <Outlet />;
};

export default ProtectedRoute;
