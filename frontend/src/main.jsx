import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import App from "./App.jsx";
import "./index.css";

import SomethingWentWrong from "./Pages/Errors/SomethingWentWrong.jsx";

import {
  Cart,
  Home,
  MyOrders,
  PlaceOrder,
  Profile,
  VerifyOrder,
  WishList,
} from "./Pages/index.js";

import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Admin Pages
import AdminLayout from "./components/Admin/AdminLayout/AdminLayout.jsx";

import AddFood from "./Pages/Admin/AddFood/AddFood.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.jsx";
import FoodList from "./Pages/Admin/FoodList/FoodList.jsx";
import OrdersManagement from "./Pages/Admin/OrdersManagement/OrdersManagement.jsx";

import NotFound from "./Pages/Errors/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<SomethingWentWrong />}>
      {/* ---------- Public Routes ---------- */}
      <Route index element={<Home />} />

      {/* ---------- User Protected Routes ---------- */}
      {/* ---------- User Protected Routes ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route path="cart" element={<Cart />} />

        <Route path="place-order" element={<PlaceOrder />} />

        <Route path="verify" element={<VerifyOrder />} />

        <Route path="my-orders" element={<MyOrders />} />

        <Route path="wishlist" element={<WishList />} />

        <Route path="me" element={<Profile />} />
      </Route>

      {/* ---------- Admin Login ---------- */}
      <Route path="admin/login" element={<AdminLogin />} />

      {/* ---------- Admin Protected Routes ---------- */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="foods" element={<FoodList />} />
          <Route path="orders" element={<OrdersManagement />} />
        </Route>
      </Route>

      {/* NOT FOUND ERROR [Always Last] */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={SomethingWentWrong}>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </ErrorBoundary>
);
