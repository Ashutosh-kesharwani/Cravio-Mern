import App from "../App.jsx";

import {
  Cart,
  Home,
  MyOrders,
  PlaceOrder,
  Profile,
  VerifyOrder,
  WishList,
} from "../Pages/index.js";

import AdminProtectedRoute from "./AdminProtectedRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Admin
import { AdminLayout } from "../components/Admin/index.js";

import {
  AddFood,
  AdminLogin,
  Dashboard,
  FoodList,
  OrdersManagement,
} from "../Pages/Admin/index.js";

import { NotFound, SomethingWentWrong } from "../Pages/Errors/index.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<SomethingWentWrong />}>
      {/* ---------- Public Routes ---------- */}
      <Route index element={<Home />} />

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
