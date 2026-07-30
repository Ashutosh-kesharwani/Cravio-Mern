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

/*
|--------------------------------------------------------------------------
| Protected Route
|--------------------------------------------------------------------------
|
| Purpose:
| Protects routes that require an authenticated user.
|
| Example:
| - /cart
| - /wishlist
| - /orders
| - /me
|
| Why is this needed?
|
| Although the Navbar already checks authentication before navigating,
| users can still manually access protected URLs such as:
|
|     http://localhost:5173/cart
|
| Without this component, those pages would be accessible simply by
| entering the URL in the browser.
|
| If the user is not authenticated:
| - Redirect to the Home page.
| - Preserve the attempted route using React Router state so that,
|   after a successful login, the application can optionally navigate
|   the user back to the originally requested page.
|
*/
